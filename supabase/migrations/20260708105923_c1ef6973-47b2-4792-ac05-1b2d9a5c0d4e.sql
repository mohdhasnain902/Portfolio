
-- Roles infrastructure
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Harden contact_messages
DROP POLICY IF EXISTS "Authenticated users can view messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON public.contact_messages;

GRANT SELECT, INSERT ON public.contact_messages TO anon;
GRANT SELECT, INSERT ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;

-- Validation constraints
ALTER TABLE public.contact_messages
  ADD CONSTRAINT contact_messages_name_len CHECK (char_length(name) BETWEEN 1 AND 100),
  ADD CONSTRAINT contact_messages_email_len CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT contact_messages_email_fmt CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  ADD CONSTRAINT contact_messages_message_len CHECK (char_length(message) BETWEEN 1 AND 5000);

CREATE POLICY "Anyone can submit contact messages"
ON public.contact_messages FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 100
  AND char_length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(message) BETWEEN 1 AND 5000
);

CREATE POLICY "Admins can view contact messages"
ON public.contact_messages FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
