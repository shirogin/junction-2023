export enum PermissionsI {
	admin_super = "admin:super", // Super Admin

	// Client Permissions:
	client_view = "client:view", //: View client details and information.
	client_create = "client:create", //: create a new client.
	client_enable = "client:enable", //: Enable or disable a client.
	client_edit = "client:edit", //: Edit client information (e.g., name, address, phone).
	client_delete = "client:delete", //: Delete a client account (if allowed).

	// Delivery man Permissions:
	delivery_view = "delivery:view", //: View delivery man details and information.
	delivery_create = "delivery:create", //: create a new delivery man.
	delivery_enable = "delivery:enable", //: Enable or disable a delivery man.
	delivery_edit = "delivery:edit", //: Edit delivery man information (e.g., name, address, phone).
	delivery_assign = "delivery:assign", //: Edit delivery man information (e.g., name, address, phone).
	delivery_delete = "delivery:delete", //: Delete a delivery man account (if allowed).

	//Shipment Permissions:
	shipment_view = "shipment:view", //: View shipment details.
	shipment_create = "shipment:create", //: Create a new shipment for the client.
	shipment_edit = "shipment:edit", //: Edit shipment details (e.g., weight, delivery address).
	shipment_delete = "shipment:delete", //: Delete a shipment.

	//Issue Permissions:
	issue_view = "issue:view", //: View issue details.
	issue_create = "issue:create", //: Report a new issue with a shipment.
	issue_edit = "issue:edit", //: Edit issue details (e.g., description, status).
	issue_delete = "issue:delete", //: Delete an issue (if allowed).

	// Desk Permissions:
	desk_view = "desk:view", //: View desk details and information.
	desk_create = "desk:create", //: Create a new desk (for super admins).
	desk_edit = "desk:edit", //: Edit desk details (e.g., name, address).
	desk_delete = "desk:delete", //: Delete an desk (for super admins).

	// Financial Permissions:
	financial_view = "financial:view", //: View financial data (e.g., balance, transactions).
	financial_adjust = "financial:adjust", //: Adjust client's balance (extract or modify funds).
	financial_report = "financial:report", //: Generate financial reports (e.g., net benefits).
	// UPS Integration Permissions
	ups_integration_generate_link = "ups_integration:generate_link",
	ups_integration_view = "ups_integration:view",
	ups_integration_revoke = "ups_integration:revoke",

	// Device Management Permissions
	device_view = "device:view",
	device_add = "device:add",
	device_remove = "device:remove",

	// Financial Transactions Permissions
	transaction_view = "transaction:view",
	transaction_add = "transaction:add",

	// UPS API Access Permissions
	ups_api_read = "ups_api:read",
	ups_api_write = "ups_api:write",

	// Client Activity Logs Permissions
	activity_logs_view = "activity_logs:view",

	// User Authentication Permissions
	user_auth_view = "user_auth:view",
	//Admin Permissions:
	admin_view = "admin:view", //: View admin details and information.
	admin_create = "admin:create", //: Create a new admin user (for super admins).
	admin_enable = "admin:enable", //: Enable or disable admin details (e.g., name, role).
	admin_edit = "admin:edit", //: Edit admin details (e.g., name, role).
	admin_delete = "admin:delete", //: Delete an admin user (for super admins).

	//Product Permissions:
	product_view_client = "product:view-client",
	product_assign_discount = "product:assign-discount",

	//Roles Permissions:
	role_view = "role:view", //: View role details and information.
	role_assign = "role:assign", //: View role details and information.
	role_view_all = "role:view-all", //: View role details and information.
	role_create = "role:create", //: Create a new role user (for super roles).
	role_edit = "role:edit", //: Edit role details (e.g., name, role).
	role_delete = "role:delete", //: Delete an role user (for super roles).

	//Dashboard Permissions:
	dashboard_view = "dashboard:view", //: Access the dashboard and related data.
	dashboard_edit = "dashboard:edit", //: Make changes to the dashboard configuration.
}
