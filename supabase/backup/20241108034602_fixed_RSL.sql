create policy "Enable users to view their own data only"
on "public"."project_members"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));




