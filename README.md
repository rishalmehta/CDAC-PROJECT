# Ghar Ka Dabba - An Online Tiffin Service
## Document 
  - System Requirement Specification Document

## Title
  - System Requirement Specification for Ghar Ka Dabba.

## Team
  - Direct Customer
  - Indirect Customer
  - Architect
  - Business Analyst
  - Quality Assurance Team
  - System Analyst

## Objective (Purpose)
The Online tiffin service 'Ghar Ka Dabba' website is intended to provide complete solution for Vendors, Customer as well as Internal users (Staff) as a single Gateway using internet. Vendors could be anyone who want to setup their tiffin service centre but don’t have platform for the same specially housewife’s who wish have a source of side income. It will enable vendors to provide tiffin service online, consumers to browse through all the available tiffin service and order tiffin without physically visiting the tiffin service centre.

## Scope
  - This System allows Customer to order tiffin on daily weekly or monthly basis.
  - Vendors would be able to maintain their menu by adding or removing tiffin’s and also will be to confirm or reject orders based on availability of tiffin's.
  - The System will be able to show live Business Operation statistics trends through Customized dashboard for stakeholders.

## Functional Requirements
### Anonymous User
Any anonymous user will be able to 
- View different tiffin’s plans and tiffin’s available in the menu.

### Customer
Customer would be to
  - Register and login to website.
  - View different tiffin’s plans and tiffin’s available in the menu.
  - Place order or cancel the placed order with 5min.
  - Pay for the placed order.
  - See History of Orders placed, based on time range (yearly, monthly, weekly, daily).
  - Provide review/feedback for the placed order.

### Vendor
Vendor will be able to 
  - Register and Login to Website.
  - Add, Remove or Update tiffin details and tiffin plans to menu maintained by system.
  - Confirm or Reject order based on availability.
  - Number of tiffin’s sold based on time range (yearly, monthly, weekly, daily).
  - Can see review/feedback provided by customer.

### Internal Staff (Admin)
Internal Staff (Admin) will be able to
  - Login to the website
  - Approve vendor Registration.
  - Approve vendors request to add or remove tiffin from menu.
  - Monitor all vendors and customers activity.
  - Monitor all payment transactions.
  - Resolve Dispute between vendor and customer.
  - Make payment to vendor based on sales done.
	
## Non-functional Requirement

### Security
  - Registered Customer will allowed to place an order.	
  - Each stakeholder will be to access system through authentication process. Who are you?
  - System will provide access to the content, operations using Role based security (Authorization) (Permissions based on Role)
  - Using SSL in all transactions which will be performed stakeholder. It would protect confidential information Shared by stakeholder to system and vice versa.
  - System will automatically log out all stakeholder after some time due to inactiveness.
  - System will block operations for inactive stakeholder and would redirect for authentication.
  - System will internally maintain secure communication channel between Servers (Web Servers, App Servers, database Server)
  - Sensitive data will be always encrypted across communication.
  - User proper firewall to protect servers from outside fishing, vulnerable attacks.

### Reliability
  - The system will backup business data on regular basis and recover in short time duration to keep system operational
  - Continuous updates are maintained, continuous Administration is done to keep system operational.
  - During peak hours system will maintain same user experience by using load balancing.
 
### Maintainability
  - A Commercial database software will be used to maintain System data Persistence. 
  - A readymade Web Server will be installed to host Ghar Ka Dabba (Web Site) to manage server capabilities.
  - Staff will easily monitor and configure System using administrative tools provided by Servers.
  - Separate environment will be maintained for system for isolation in production, testing, and development.

### Portability
  - System will provide portable User Interface (HTML, CSS, JS) through which users will be able to access Ghar Ka Dabba.
  - System can be deployed to single server, multi-server, to any OS, Cloud (Azure or AWS or GCP)

### Availability
  - uptime:   24* 7 available 99.999%

### Accessibility
  - Only registered customer will be able to place an order after authentication.
  - Vendors will be able to maintain a menu and can reject or approve orders.
  - Staff will be able to view daily, weekly, monthly, annual business Growth through customized dashboard.

### Durability
  - System will retain customer order cart for 15 minutes even though customer loose internet connection and join again.
  - Customer will be able to add or remove tiffin’s from order cart whenever needed.
  - System will implement backup and recovery for retaining stakeholders’ data, business operation data and business data over time.

### Efficiency
  - On Festival season, maximum number of users will place order, view available tiffin services with same response time.
  - System will be able to manage all transactions with isolation.

### Modularity
  - System will designed and developed using reusable, independent or dependent business scenarios in the form of modules.
  - These modules will be loosely coupled and highly cohesive.
  - System will contain login, registration, menu, order cart, order processing, payment processing, membership and Roles management modules.	

### Scalability
  - System will be able to provide consistent user experience to stakeholder as well as visitors irrespective of load.

### Safety
  - Its functionalities are protected from outside with proper firewall configuration.
  - It will be always kept updated with latest anti-virus software.
  - Business data will be backed up periodically to ensure safety of data using incremental back up strategy.
  - Role based security will be applied for Application data and operations accessibility.
