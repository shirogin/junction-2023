interface PermissionsI {}
declare interface RoleI {
	_id: string;
	name: string;
	permissions: PermissionsI[];
}
