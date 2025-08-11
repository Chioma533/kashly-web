-- Location: supabase/migrations/20250128211232_kashly_auth_system.sql
-- Kashly FinTech Authentication and User Management System
-- Integration Type: Complete new authentication system
-- Dependencies: auth.users (Supabase managed)

-- 1. Types and Enums
CREATE TYPE public.account_type AS ENUM ('personal', 'business');
CREATE TYPE public.transaction_type AS ENUM ('deposit', 'withdrawal', 'transfer', 'payment');
CREATE TYPE public.transaction_status AS ENUM ('pending', 'completed', 'failed', 'cancelled');

-- 2. Core User Profiles Table (Required for PostgREST compatibility)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone_number TEXT,
    account_type public.account_type DEFAULT 'personal'::public.account_type,
    profile_picture_url TEXT,
    wallet_balance DECIMAL(15,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Transactions Table
CREATE TABLE public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    type public.transaction_type NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    description TEXT,
    recipient_name TEXT,
    recipient_email TEXT,
    status public.transaction_status DEFAULT 'pending'::public.transaction_status,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Savings Goals Table
CREATE TABLE public.savings_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    target_amount DECIMAL(15,2) NOT NULL,
    current_amount DECIMAL(15,2) DEFAULT 0.00,
    target_date DATE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. Essential Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_transactions_created_at ON public.transactions(created_at DESC);
CREATE INDEX idx_savings_goals_user_id ON public.savings_goals(user_id);

-- 6. RLS Setup
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.savings_goals ENABLE ROW LEVEL SECURITY;

-- 7. Helper Functions for RLS
CREATE OR REPLACE FUNCTION public.is_own_profile(profile_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT profile_id = auth.uid()
$$;

CREATE OR REPLACE FUNCTION public.owns_transaction(transaction_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.transactions t
    WHERE t.id = transaction_id AND t.user_id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.owns_savings_goal(goal_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.savings_goals sg
    WHERE sg.id = goal_id AND sg.user_id = auth.uid()
)
$$;

-- 8. RLS Policies
CREATE POLICY "users_manage_own_profile"
ON public.user_profiles
FOR ALL
TO authenticated
USING (public.is_own_profile(id))
WITH CHECK (public.is_own_profile(id));

CREATE POLICY "users_manage_own_transactions"
ON public.transactions
FOR ALL
TO authenticated
USING (public.owns_transaction(id))
WITH CHECK (public.owns_transaction(id));

CREATE POLICY "users_manage_own_goals"
ON public.savings_goals
FOR ALL
TO authenticated
USING (public.owns_savings_goal(id))
WITH CHECK (public.owns_savings_goal(id));

-- 9. Automatic Profile Creation Function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, account_type)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'account_type')::public.account_type, 'personal'::public.account_type)
  );
  RETURN NEW;
END;
$$;

-- 10. Trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 11. Updated timestamp trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;

-- 12. Triggers for updated_at
CREATE TRIGGER handle_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_transactions_updated_at
  BEFORE UPDATE ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_savings_goals_updated_at
  BEFORE UPDATE ON public.savings_goals
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 13. Mock Data for Testing
DO $$
DECLARE
    user1_id UUID := gen_random_uuid();
    user2_id UUID := gen_random_uuid();
    transaction1_id UUID := gen_random_uuid();
    transaction2_id UUID := gen_random_uuid();
    goal1_id UUID := gen_random_uuid();
BEGIN
    -- Create test auth users with all required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (user1_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'john.doe@kashly.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "John Doe", "account_type": "personal"}'::jsonb, 
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, '+1234567890', '', '', null),
        (user2_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'jane.smith@kashly.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Jane Smith", "account_type": "business"}'::jsonb,
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, '+1987654321', '', '', null);

    -- Update wallet balances
    UPDATE public.user_profiles SET wallet_balance = 2500.00 WHERE id = user1_id;
    UPDATE public.user_profiles SET wallet_balance = 5750.50 WHERE id = user2_id;

    -- Create sample transactions
    INSERT INTO public.transactions (id, user_id, type, amount, description, status, created_at)
    VALUES
        (transaction1_id, user1_id, 'deposit'::public.transaction_type, 1000.00, 'Initial deposit', 'completed'::public.transaction_status, now() - interval '7 days'),
        (transaction2_id, user1_id, 'payment'::public.transaction_type, 25.99, 'Coffee subscription', 'completed'::public.transaction_status, now() - interval '2 days'),
        (gen_random_uuid(), user2_id, 'transfer'::public.transaction_type, 500.00, 'Transfer to savings', 'completed'::public.transaction_status, now() - interval '1 day');

    -- Create sample savings goals
    INSERT INTO public.savings_goals (id, user_id, title, target_amount, current_amount, target_date, description)
    VALUES
        (goal1_id, user1_id, 'Emergency Fund', 5000.00, 1200.00, (CURRENT_DATE + interval '12 months')::date, 'Build emergency fund for unexpected expenses'),
        (gen_random_uuid(), user2_id, 'Vacation Fund', 3000.00, 750.00, (CURRENT_DATE + interval '6 months')::date, 'Save for European vacation');

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;