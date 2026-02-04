---
title: 'My Brag Document'
description: My brag document encapsulating my work from 2024-2026.
date: '2026-02-04'
categories:
  - career
published: true
---

## 2024

### February

**February 13**

- Started a new role at **Lights On Heights**
- Finished Limestone Product Onboarding with Temitope
- Took part in Design Review meeting
- Joined Backend team to work on Microservices demo

**February 14**

- Finished LoH Clickup onboarding with Amaka
- Implemented Gateway in Microservices demo using Ocelot
- Added Authentication to Gateway using JWTs

**February 15**

- Finished basic Nats Demo with interacting services
  - Setup request-reply. This is used to send requests from the gateway to the microservices.
  - setup pub-sub using background services to listen to requests.
- Explained microservice basics to backend teammates.

**February 16**

- Setup api gateway with nats
  - http requests from controller are sent to message broker
  - use nats request-reply to route messages based on topic name

**February 19**

- Optimise NATS library - connection pooling, yada yada
- Implement JetStream methods for persisting messages like a normal broker (rabbitMQ)
- Document NATS library (for future users)
- Planned sprint 4
- Created NuGet package for shared classes (used in all microservices to make life easier & follow DRY principles).

**February 20**

- Create API Server project with health check controller
- Create NuGet package for NATS library (a wrapper around a wrapper?)
- Implement JetStream support to persist messages
  - Add functionality to auto-create streams in NATS (runs on application startup to create streams for all subscribers. uses .NET reflection)

**February 21**

- Write documentation for NATS Library
- Explored Fusion Auth as an auth provider with Moyo

**February 22**

- Added Exception Handler to Console Applications
  - Although, it is rather limited.
- Walked Chima through usage of the NATS wrapper
- Started looking through choices to setup observability and logging.
  - Currently considering OpenTelemetry, Prometheus, Grafana and Seq.
- Talked about deployments for NATS and other services with Oma.
  - NATS deployment requires certificates and other setups for maximum security,

**February 26**

- Orchestrated observability using docker-compose with Prometheus, Grafana, and OpenTelemetry.
  - Learned a bit about Docker networking inside and outside the container.
- Reviewed PR by Moyo into auth service.
- Updated README for NATS NuGet after receiving feedback from Chima

**February 27**

- Got access to Azure to create Postgres DB
- Linked gateway to auth service and tested nats message routing
  - worked great, thankfully.
- Fixed a bug with `Result<T>` in the shared library and wrote docs to guide usage
- Tested migration of User Data from MS SQL to FusionAuth
  - This was easier than expected. Will need to document ahead of moving to production.

**February 28**

- Added Telemetry and Logging with Application Insights
  - Need to use prometheus and grafana for NATS though
  - Azure App Insights is fine because it doesn’t require exposing the service to the internet. BUT, it is slow to update.
- Reviewed PRs from Moyo and Chima

**February 29**

- Created missing Docker files for some services
- Reviewed PRs from Moyo and Chima
- Add Serilog and Seq to Shared Library for easy installation in projects
- Added Azure Insights to Shared Library for easy installation in projects
- Joined Moyo to organise database tables into separate services

### March

**March 4**

- Planned sprint 5 with Moyo and Tosin
  - Plotted planned endpoints and their NATS topics, then assigned tasks to backend team members
- Worked with Oma to resolve bugs during deployment

**March 5**

- Designed and created database for Residential Service
- Fixed Production Bugs
  - Access requests not sending expiry notifications
  - Allowed users to set a background colour for their wallets
  - Fixed wallet balance inconsistency on portal
- Assisted Oma with fixing port issue for gateway deployment

**March 6**

- Added CRUD for community service
- Added tests using sqlite-db instead of mocking database

**March 7**

- Wrote more tests for community service.
- reviewed a lot of PRs. A LOT, maybe like 8-10.
- Fixed a deployment script on the microservice gateway
- Add a build action to ensure PRs don't break the build on gateway.

**March 8**

- Added a bunch of endpoints
  - Create, Fetch and Delete House/Street Groups
  - Get all House/Street groups in a community
- Added Pagination to Shared Library

**March 11**

- Fix small bug with Roles on auth service / gateway
  - The roles were being parsed to an enum in a case-sensitive manner, instead of insensitive as we want
- Add endpoints for street & house groups: create, get, delete, get all.
- Reviewed Pull Requests raised by Moyo.
- Setup Csharpier for formatting

**March 12**

- Setup database for financial service
- add unit of work pattern so we can use transactions for all db updates. should make our lives easier.

**March 13**

- A bit under the weather. sickness #1 lol.

**March 14**

- Add endpoint to create Paystack subaccounts
- add endpoint to pay dues with wallet
- add endpoint to get apartment by id
- fix fusion auth with Oma & Moyo
  - Update values files with new environment variables

**March 18 - 19**

- Sprint Planning
- Added index route to gateway for testing by Devops
- Added hotfixes to gateway f

**March 20**

- Add JwT support to microservice gateway
  - Can now use JWTs from FusionAuth to authorise users
- Assisted Otonye with resolving a CORS issue
  - APIM required a CORS policy. I looked into it then pointed Oma to a solution, which resolved his problem.
- Create DB Dump scripts for the monolith dev and staging databases
- Add code to Shared library to auto-register repositories, services & background services

**March 21**

- Add endpoint to get and filter all dues in a community
- Add endpoint to get user, apartment & community wallet transactions

**March 22**

- Setup Notification Svc
  - Created Database
  - Created rough outline for service design
- Created overload methods in NATS for publishing to JetStream
  - Add configurable retry time for JetStream messages, defaulting to 1 minute
- Applied db dump script to cluster databases

**March 25**

- Setup Notification Service
  - Database setup with the same tables as in monolith (can remove properties later as i understand the system)
  - Setup SendGrid
  - Add EmailTemplate service for building email bodies
- Add endpoints for verifying & resending OTPs

**March 26**

- Code reviews, mainly. About 20 reviews with Moyo.
- Fixed a multithreading issue with HouseGroups and StreetGroups
- Fixed an issue with the monolith pointing to the wrong database & throwing errors
- Fixed an issue with Limestone 2 services failing during db connections
  - set them to retry on failure & created databases in servers where necessary
- Fixed an issue with Limestone 2 not sending email notifications
  - Devops changed NATS url, so messages were being sent to an unused NATS server
- Deployed notification service to new cluster

**March 27**

- Fixed pagination issue in shared library
  - Logic issue would reset page size and number to 1 and 1.
- added an endpoint to change a user’s password, when they are logged in.

**March 28**

- Added locks when updating wallet balance
- Restored staging & dev monolith databases to new Azure db
  - connected to windows VM using RDP to accomplish this

### April

**April 4 - 14**

- Updated deployment scripts for monolith to point to new cluster
- Planned for PI 10
  - Created tasks for sprint 1 & 2
- A bunch of boring planning & public holidays.

**April 15**

- Reviewed some pull requests
- Configured Docker Compose for Limestone 2.0 (Misc, but essential to all services & teams)
  - This pulls the latest images for all services from Azure’s Container Registry & sets their configuration
  - This sets up the required dependencies like NATS, FusionAuth & the databases for each service.
  - This uses FusionAuth’s kickstart to set up an application & tenant, so the values don’t change each time we recreate the application.
  - This allows every team to work while our main environment is down.

**April 16**

- Assisted Tolu & Ope with using the compose I created yesterday.
  - Tolu had a simple problem with his env file - he named it `env` not `.env`. The period is important.
  - Ope has login issues with Azure & our Default Directory organisation. We had to reach out to the admin to fix that.
- Created endpoint to add a single member or members to a house group (residential)
- Fixed deployment issue related to the new docker-compose
  - I earlier set the build job to push images suffixed with the `latest` tag. However, the deploy job was set to fetch images using the GitHub hash. Moyo helped to change the scripts to fix this issue. See this for more info: [Changes to Deployment Script](https://rppng-my.sharepoint.com/:b:/g/personal/chukwuemekai_lightsonheights_com/EUCatbqL3dlBvhGwEw3UdB0BYFUzW8l_iYIhyJfhg4zcEw?e=kjwhyY)
- Updated docker compose to use a single MS SQL instance
  - I had a brain fart yesterday and forgot you could have multiple databases per server.
- Setup Complaint Service
  - Used the console template, as usual. Also updated the packages used.

**April 17**

- Updated logging code in shared template to use in-code configuration instead of complicated appsettings
- Updated configuration setup to validate settings at startup
  - This way, if our app is misconfigured, we will know at startup.
  - This uses Data Annotations and the Options pattern.
- Update NATS library to allow callers provider a service name
  - NATS provides a monitoring page on which you can view the connections to the server. By setting this name, we have more info on who is connected.
- Updated the docker-compose to use specific versions of services, instead of pulling the latest every single time
- Helped Ope resolve some Azure issues. She couldn’t log in with the CLI so I had to help her resolve that.
- Set all microservices (except gateway) to apply migrations in dev or staging environment
  - this fixes an issue with failing to connect to a database server because the db they include in the connection string doesn't exist

**April 18**

- Filtered out noisy logs from EF Core
- Setup & added Azure App Configuration as configuration provider.
  - I created the app configuration store.
  - I organised keys with labels & prefixes so different keys can be set for different environments & settings
  - However, settings can still be picked from appsettings files or env to override azure
  - This change, most importantly, removes **secrets** from our workflow files.
  - Even more importantly, new developers can launch our application with a few clicks. But there is still a little work to be done.
- Updated the deployment scripts to remove secrets & use azure app config (all services)
- Fixed bugs reported by Ope on ef core caching issues. This was mainly Moyo's work tbh.

**April 19**

- Setup blob storage to store images
- Reviewed PR from Moyo on Bulk Upload (residential)
  - Had to redesign the implementation & share with him to reimplement
  - Later on, I had to write the code myself before approving the PR
- Created endpoint to set a user's profile image (auth)

**April 22**

- Fixed an issue with the Residential service caught in a failure backoff loop
  - There was an exception during startup when the database would fail to migrate. The SQL database was unreachable.
  - I checked app config & the connection string was connected. I remembered that config accepts env variables too & it overwrites the values from azure app config.
  - Turns out the database variable stored in env was incorrect. I deleted it & the application started correctly.
  - Also deleted unused secrets from other pods & releases.
- Created an endpoint for uploading complaint photos (complaint)
  - This was a pair programming session with Chima

**April 23**

- setup the service provider project, modelled the database & deployed it
- wrote endpoints to create & fetch occupations - they are awaiting code review.
- Helped Patrick setup docker, az cli & the docker compose so he can start developing. Also showed him how to fix CORS errors with the API

**April 24**

- Fixed Azure issue for Mr Tosin
  - Helped log into azure through CLI, using the correct subscription. This led us to discover a new bug
- Fixed docker image architecture incompatibility for Mac
  - Updated the deployment scripts to build an image targeted to multiple platforms
- add endpoints to create & fetch service providers

**April 25**

- Fixed a bug in the bulk upload error causing it to break at the end (residential)
  - we returned a failure response when it succeeded cause of some basic if-else logic mistake
- add endpoints to edit & delete occupations (service provider)
- add endpoints to edit, archive & unarchive occupations (service provider)

**April 26**

- add endpoint to get & search occupations in a community (service provider)
- add endpoint to get & search service-providers in a community (service provider)

**April 28**

- Assisted with the migration effort
  - Backed up prod, staging & dev and imported the data to the new databases on the new cluster
- Created an endpoint to calculate Paystack’s transaction fee
- Reviewed PRs from Chima

**April 29**

- Continued with migration effort.
- Reviewed PRs from Moyo & Chima

**April 30 - May 3**

- On break due to illness

### May

**May 6 - 8**

- Reviewing and rewriting PRs from Chima. (Gatepass)
  - He released about 10 PRs that all built upon one another and included a host of errors. I had to painstakingly rewrite most of them.

**May 13**

- Added endpoint to get details of a users residence: which communities & apartments they belong to (residential)
- Updated access request endpoints to match the designs after a complaint from Patrick (gate pass)

**May 14**

- Fixed a bug where JWTs generated weren’t being validated correctly
  - Had to generate a key & fetch the public key from FusionAuth to use as the IssuerSigningKey
- Researched & wrote a doc about the new flow for managing user created permissions

**May 15**

- fixed bug with creating & updating announcements. now users can create announcements that aren’t events, without being required to set a date (residential)
- updated paystack transaction fee calculation (Financial)
  - it now correctly calculates the fee to ensure customers completely cover the charge from paystack
- add properties to street and house groups to match design after a complaint from Patrick (residential)

**May 16**

- Replaced NoContent endpoints with 200 Ok and default messages
  - Frontend complained that the lack of messages on success was affecting them
- Updated device models implementation (notification)
  - added endpoint to upsert device models
  - added endpoint to remove device models for a user

**May 17**

- add endpoints to create custom roles with permissions in communities (residential)
- auto create an admin role for the community manager after creating a community (residential)

**May 20**

- Lots of meetings
  - Sprint retrospective
  - Planning future sprints

**May 21 - 22**

- Planning the changes to Wallets, Transactions & Dues

**May 23**

- Implement changes to Wallet on Limestone 2.0 (financial)
  - Implemented proper hashing and salting for wallet PINs to fix a security vulnerability
  - Separated bank account data from the wallet entity
- Started research on offline gatepass

**May 24**

- Shelved offline gatepass while more thought is put into it
- Implemented endpoints to get user & apartment wallets (financial)
- implemented endpoint to get wallet transactions (financial)

**May 27**

- Completed design for Dues & Transactions after meeting with team (financial)
- Finalised design for offline gatepass after meeting with team
  - need to take notes and document design and steps to take

**May 28**

- discussed with team about reworking dues implementation (residential)
  - changed the options to be picked by users when creating dues. they can choose apartments, house or street groups. From those, we’d fetch the apartments that ought to pay
- continued to document & finalise feature design
- added & adjust entities based on feature design for dues

**May 29**

- outlined implementation for (with Moyo and Chima) (financial)
  - transfer between wallets
  - depositing into wallets
  - withdrawing from wallets
- implemented endpoint to initialise deposits into wallets (financial)
- visited nearby estate to elicit requirements for hardware implementation (card readers)
  - with Tosin, Temitope & Mabel
  - notes were Shared with Temitope to use in his report

**May 30**

- Completed webhook service to complete deposits into wallets. This includes many parts: (financial)
  - added a webhook controller
  - added a service to verify that payments originate from Paystack
  - added helper methods to easily manage wallets
- Unlinked the occupation entity from communities after discussion with Ope and Patrick (service provider)
  - occupations exist independently of communities. they are created by admins, and should be viewable by anyone, without needing a community id
- setup hangfire in financial service

**May 31**

- Worked with Moyo on wallet deposits (financial)
  - currently stuck on testing the webhooks for various transfer scenarios. paystack don’t let a test business attempt fake transfers.
- Helped Patrick & Moyo setup ngrok & paystack for testing webhooks (financial)
- added new properties to wallet transaction responses as required by the frontend (financial)

### June

**June 3**

- sick

**June 4**

- Review PRs and assist Moyo and Chima with completing some financial tasks (financial)
  - completed withdrawal
  - completed wallet to wallet transfers
- added a proper lock to wallet deposits to prevent over-crediting (financial)
- started work implementing offline gatepass (residential, 1.0)
  - allow time to be passed in for check in, log in, log out and check out.
  - add isOffline property, and handle it correctly

**June 5**

- Completed implementation for Offline Gatepass (residential, 1.0)
  - add endpoints to create and store gate pass keys
  - add endpoint to get signed and encoded access request
    - This sends both a signature & the base64 encoded data, to be encoded in the QR
- Fixed an issue with the Dockerfile preventing the Emergency service from deploying. Ridwan helped narrow the issue, which helped me fix it

**June 6**

- Fixed a bug with withdrawals preventing transactions from completing (financial)
  - we were fetching transactions wrongly & excluding fees. As such, it would throw an error saying ‘fees not found’ cause we weren’t fetching them in the first place
- updated offline gatepass endpoint to fetch access requests by code, not their id (1.0)
- updated database to represent enums as strings instead of numbers.
- updated endpoint to create dues (residential)

**June 7**

- worked with Azeez to debug errors with offline gate pass on monolith(1.0)
  - narrowed down to credential issue. Azure's defaultCredential couldn't authenticate the application

**June 10**

- Reviewed NATS library implementation to allow multiple services listen to the same topic (all services)
  - think of how rabbit MQ fans out messages to all subscribers, so that they are handled independently
- released endpoint to create a due. this also includes: (residential)
  - notification service handler to push notifications
  - financial services handler to create subscribers
- update endpoint to get wallet transactions to use new filters (financial)

**June 11**

- added endpoint to pay dues with a wallet (financial)
- removed KYC validation for community managers during withdrawals
- removed wallet color validation, allowing frontend to store any values they choose (financial)
- updated get all dues implementation to handle new statuses & use NATS changes (residential)
- deleted unused endpoints
  - get community, apartment & user wallet transactions. instead, just use wallet/transactions.

**June 13**

- added a test hotfix for the withdrawal method
  - we have occasional exceptions related to tracking changes (related to NATS causing weird ef core caching issues). we move the update method outside of a lock method which may have caused us to track entities multiple times. we are not sure if this solves it though.
- add endpoint to update community roles (and their permissions) (residential)
- add endpoint to get all community roles (residential)
- add endpoint to delete a community role (residential)
- add endpoint to assign a role to a community worker (residential)

**June 14**

- add endpoint to get a single community role (residential)
- fix bug not consistently returning all community wallets. it would sometimes return an empty list (residential)

**June 24**

- returned from holiday :(
- fixed error returning stale data when fetching all community roles (residential)
- prevent duplicate emails on signup (auth, notification)
- add endpoint to get all community workers (residential)

**June 25**

- added service to deactivate a community worker (residential)
  - this includes handlers to deactivate the user & send notifications
- Lots of PR reviews for Chima & Moyo

**June 26**

- Fixed a bug on Limestone 1.0 sending more than 64 notifications when an access request is checked in. (1.0)
- For offline gate pass, I changed the size of the signature by using a different algorithm (SHA-1 with ECDSA). Also removed unnecessary data from the DTO. (1.0)

**June 27**

- add endpoint to get a community worker by their userId (residential)
- review PRs from Chima
- Implement mock momas services using run time dependency injection (residential)
  - use mock on staging/dev, use real API in prod

**June 28**

- implement permissions filter for community roles & permissions (residential)
- research how long it would take to implement reporting service
  - we would be using postgreSQL’s logical replication feature
  - this should take a month
- Find todo's in codebase, and create tasks based off them

### July

**July 1 - 8**

- Meetings
- PI Planning
- Feature Planning for Stone Circle, Admin Portal, Limestone 2.0.
- Created tasks based of todos
- Found fix for stale data issue! Issue was caused by a misunderstanding how background services in .net execute. The fix requires us to resolve the service handling a message, when a new message is received by the NATS wrapper, instead of when the background service is initially created.
  - The background service has a singleton lifetime, meaning a service resolved at startup will be used throughout the lifetime of the application. But, when resolved on message received, we get a fresh sevice each time.

**July 9**

- Applied fix for stale data issue to Auth, Gateway & residential service
- synchronised namespaces on residential service
- added method to get environment variable to shared library
- published apartment.created, serviceprovider.created from their respective services

**July 10**

- Fixed error crashing financial, complaint & notification services
  - the first two were missing an environment variable & the latter was missing an appsetting.
- Reviewed PRs from Moyo & Chima
- added handlers for the apartment.created & serviceprovider.created events in financial & complaint services. These handlers are idempotent.
- publisher service.provider created & added handler in complaint service
- published & handle service.provider.archived & service.provider.unarchived events
- Sorted the tasks in the PI11 backlog, assigned priorities and story points to estimate effort.

**July 11**

- Renamed NATS topics for events to use the ".event" suffix. This makes it easier to identify events at a glance.
- removed paystack subaccount endpoint
- published and handled wallet.created event
- published & handled community.settings.created & community.settings.updated events

**July 12**

- spent the entire day reading through PRs with Moyo. These revolved around publishing events from the auth service & handling the events in other services to store a copy of the user data.  
  We had to change a lot of the implementation. We slimmed down the data stored in most services, only storing what we need. Then we made changes to how updates are handled, so the post-updated entity is what gets published, and the handlers simply set their values to what is in the event.
- also spent a while debugging VS Code. The C# extension kept breaking, crippling my workflow and I had to dig through multiple forums to resolve it.

**July 15**

- Out of office due to illness

**July 16**

- Made a small fix to the authorisation on offline gatepass. I set it to require an 'Admin' role instead of 'SuperAdmin'.
- Wrote documentation for DevOps specifying changes to make when deploying to staging or prod. This notes the settings & workflow changes required for the offline gatepass to function correctly.
- Thoroughly reviewed changes to endpoints using userIds. The intent is to prevent users from passing these userIds, and instead fetching them from the JWT. Moyo did the first part of this work, and I reviewed, made some more changes, then wrote a doc detailing the endpoints changed for Patrick and Tolu to reference. Used [Tufin/oasdiff: OpenAPI Diff and Breaking Changes](https://github.com/tufin/oasdiff) to get the changelog.
- Reviewed Chima’s code, made suggestions & requested changes.
- Redefined timelines for my remaining work this sprint.

**July 17**

- investigate and resolve database migration issues on service provider. The migration failed to apply, causing exceptions when inserting data that did not exist in db. This was resolved by adding the properties, creating a migration, then editing the migration to remove the properties.
- publish & handle community.electricity.provider.rate.created , community.electricity.provider.rate.updated & community.electricity.provider.rate.deleted events
- remove join community requests endpoints, services, dtos - everything
- add hangfire to residential service
- I had to close work early due to a fever

**July 18**

- published & handled electricity.provider.created.
- added new methods to NATS library to auto register streams across the entire solution
- added a central endpoint to upload images to blob storage. This sits in the API gateway and returns a URL.
- added profileImage to update user endpoint.
- update flow for creating a complaint to accept photoUrls instead of comlaintPhotoIds. This reduces the number of API calls
- added `[allowAnonymous]` to reset password routes to fix an issue for Ope.
- setup hangfire in Residential Service

**July 19**

- return dateCreated in community & due responses
- update flow for uploading user kyc info to accept photoUrls instead of kycPhotoIds.
- this was the last day of the sprint. Moyo was on leave & Chima vanished around 1pm. I spent the day reviewing their PRs and fixing any fucking errors so I could merge and close their tasks out.
  - fixed a lot of migration errors when dealing with due events. i added navigation properties to the copied data to make it easier to query. there was also a lapse where some tables vanished from the financial service & i had to manipulate migrations to get it back.
  - there was a PR pushed that was broken (Chima.) and I had to fix the build error & code before closing it.
  - added a reusable method for querying postgres databases using the ILike method. this needs to be added to the shared library.

**July 22**

- looked into adding a workflow job for checking if code is properly formatted. this should at least prompt everyone to check that 'format on save' is enabled.
- reviewed the implementation of device models/tokens based on a discussion with mr tosin & tolu
  - now, we treat a userId & token as a composite key. so, users can have multiple device models for each device they are logged in to. when a user logs in and this endpoint is called, that token & their userId are treated as a unique pair. when we need to send notifications we can send to all their devices.
  - added an endpoint to delete a single userId/token pair. this will be used when they log out on a device.
- add ILike query extension to shared library

**July 23**

- did some research into notification services with websockets
  - looked at uses of nats websockets for real time communication
- experimented with publishing messages using nats websockets
  - had some initial issues configuring the server when trying to mount my configuration. This turned out to be a windows path issue which i have now solved.
  - the message publishing is seamless, no changes need to be made on the backend side, for normal pub-sub. the frontend will connect to the server & subscribe to the topic it needs. Jetstream needs to be handled differently and is a bit more complicated.
- added a workflow to Github to check that submitted code is properly formatted.
  - created the yaml file & raised PRs to all 9 services (create task)
- added an endpoint to get all a user’s device tokens
- started experimenting with .net CAP

**July 24**

- Discussed the task to 'auto-update APIM schema in CI/CD' with Azeez and Victor. I explained the requirements to them, and pointed them to where they could read more about it.

**July 26 - 31**

- Long break from work due to severe illness.

### August

**August 1**

- Updated the NATS package to have necessary features for user notifications implementation. We can now use attributes to customise stream configuration.
  - Also added convenience methods for sending messages to the ‘user.notification.userId’ topic.
- Implemented the UserNotification class & stream with the necessary configuration to demonstrate that it worked.
- Updated documentation on the NATS library to better explain its features
- implemented push notification for a visitor checking in an access requests
  - this includes raising the event & handling it in the notification service
- Refactored code to centralize logic for publishing events to NATS
  - uses a generic method instead of event-tailored methods that do the same thing.

**August 2**

- Noticed an error when handling notifications resulting in duplicate notifications being sent and saved for a user.
  - fixed this by removing unused props from userNotifications table.
  - adding messageId to events & userNotifications table
  - using userId & messageId as a unique property to avoid duplicates. added an index on the fields.
- implemented push notification for an access request getting checked in
- wrote tests to assert publishing & handling worked correctly
- designed implementation of notifications that require us to fan-out an event to multiple residents
- implemented push notification for an announcement being created. this uses the design above to send notifications to all users in the community.
- attended team meeting to discuss progress over the last sprint. work is to be done to adjust now that Chima is leaving.

**August 5**

- retrospectives & task reshuffling now that Chima is gone. We will work on notifications this sprint.
- reviewed open PRs with Moyo and covered edge cases that weren't handled when sending notifications for wallet events & due events

**August 6**

- working on about four inter-related tasks. the aim is to send warning notifications when an access request is about to expire. then, we also need a job in the background that marks access requests as expired when the checkout time is hit.
  - so far, i have set it to queue both jobs when an access request is created.
  - next, i have set it to delete both jobs when an access request is deleted.
  - of course, this includes testing & adding hangfire & creating the notification template.
  - i also needed to discuss with Moyo on the best approach & we have now reached a conclusion on that.
  - the code written so far also includes tests.
  - tomorrow, i will finish the implementation by rescheduling the jobs when an access request is extended.

**August 7**

- reviewing alternatives to 3-layer architecture and found an alternative to our current implementation.
- add pr to delete access request jobs on checkout
- add pr to reschedule jobs when an access request is extended
- implemented batching for publishing a large amount of push notifications.
  - refactored announcement created event handler to use batching
- wrote a fair amount of unit/integration tests.

**August 8**

- Fix error on gatepass & notification service causing the deployed services to crash
  - a NATS stream name was changed, causing conflicts with the old stream because both had the same topic. Fixed by deleting the old stream
- demoed vertical slice architecture and how it would look implemented in our system
- demoed using test containers for integration tests in place of sqlite.
  - this gives the benefit of testing against a real database.
- published emergency resolved event & sent the push notifications
- refactor the due created event handler to use the batch publishing approach
- reviewed PR for publishing & sending notifications for withdrawal completed & withdrawal failed event.
  - This took a fair amount of time as we had an eureka moment & decided to split a large event into smaller, specific events.

**August 9**

- publish a push notification when a community manager views an access request
  - had to refactor the implementation because it was using the old implementation
  - the old implementation was also half-assed tbf
  - updated the endpoint route
- reviewed a PR from Shittu
  - while reviewing, I noticed the implementation changed our lock statement. decided to investigate & test the locking mechanism
  - turns out the change & old implementation weren’t doing what they should.
  - asked on stack overflow, and asked other devs too. might remove locking for the time being till we need to use it.

**August 12**

- wrote and shared a demo for implementing features using vertical slice architecture
- published an event and notification after a complaint is assigned
- removed group id from get members in group endpoints response
  - the group id is used to fetch the data. it’s redundant to include it in the response
- published an event and notification after a complaint is resolved
  - updated the implementation so that it is resolved by a resident. for this, i moved the endpoint out of the community controller and into the complaint controller.
- reviewed dotnetcore CAP for possible implementation in our system.

**August 13**

- exhausted by the amount of work left to do :/
- reviewed APIM workflow from Moyo
- reviewed PR to publish & handle a due suspended event & send notifications
- removed profile photo, user kyc & complaint photo endpoints
- refactored complaintAssignedEvent & complaintResolvedEvent PRs to use VSA
- Fixed a bug that would randomly cause requests to endpoints to fail
  - a req would be sent to a service. the service would return data. but the requester would throw an exception cause the data returned was null
  - turns out NATS wraps exceptions that occur when serializing/deserializing messages in req-response
  - i updated the nats library to throw those errors up the stack so the issue is visible going forward

**August 14**

- resolve nats websockets issue on deployed instance
  - changed the nats config to ignore TLS on the development environment
- explained the nats notification design and the nuances of the implementation to tolu
- reviewed code from Moyo and taught him to cherry pick commits with github desktop

**August 15**

- add endpoints to get (and filter) all user & community notifications
- add endpoints to mark a single user/community notification as read
- add endpoints to mark all user/community notifications as read
- fixed migrations on emergency service without losing data
- update notification entities to have an 'isRead' column

**August 16**

- handle user created & user updated events in emergency service
  - added already existing user entities here
- changed route for the new notification endpoints for consistency
- add endpoint to get house details
  - this endpoint gets all apartments on a certain address, the occupants and main tenant and the sum of dues owed by every entity on that address.
- reviewed PRs

**August 19**

- Meetings, sprint retrospective
- Wrote initial design document for real-time notification system using NATS, Jetstream and Websockets

**August 20**

- fix bug with notification endpoints where APIM marks all params as required
- update template for microservices
- setup stone circle service using template
  - worked with Victor to add the deployment script and get it on k8s
- reviewed PRs from Moyo
- reviewed stone circle MVP & designs to create design document detailing the features to be worked on in this sprint.

**August 21**

- finalised design document for part 1 of stone circle with feedback from teammates
- setup database entities in stone circle service after designing the schema
- handle user created & user updated events in stone circle service
- add endpoint to create a circle (tests included)
- add endpoint to get a circle (tests coming soon)
- reviewed PRs from moyo
- explained to Moyo why it is better to use `Count` over `Any()` when checking if `List<T>` contains values

**August 22**

- reviewed and fixed errors / made changes in PRs
- did research into placing permissions in JWT’s generated by fusion auth
- add endpoint to get a circle
- add endpoint to get or create a circle invite code
- add endpoint to add a member to a circe
- add endpoint to get all user circles

**August 23**

- review PRs with Moyo
  - this is starting to take the first 4 hours of my day, everyday
  - often have to review, kick back bad ideas/design, and fix misc errors
- add endpoint to remove a member from a circle
- add endpoint to update a circle
- add endpoint to delete a circle

**August 26**

- reviewed PRs with Moyo
- refactor create due to use VSA
  - added tests
- Fixed a cause of compiler warnings in our DB repository patterns
- Added code to prevent creating duplicate due subscribers entities for the same apartment
  - added tests to ensure this works as expected

**August 27**

- Fixed bug with hangfire scheduling jobs on the wrong servers
  - setup hangfire servers in each application, instead of using a shared database.
  - this was causing hangfire to take jobs queued on the auth service, and process them in residential
- review PRs
- Resolved code issues reported by Janet

**August 28**

- add endpoint to get user access request history
- add endpoint to get community access request history
- sync mr Tosin to discuss implementation of stone circles member functionality
- helped Victor with implementation of auto-update workflow for APIM on the microservice gateway
- complete service to validate electricity purchase
  - refactored & added tests
- add phone number to users table on stone circle
- add endpoint to add contacts to stone circle
  - based off discussion with Mr Tosin
- review PRs with Moyo

**August 29**

- implement service to add contacts to stone circle
  - based off discussion with mr Tosin
- helped Victor and Azeez complete implementation of auto-update workflow for APIM
- review PRs with Moyo
- research search implementation for fusion auth
- researched new implementation for transactions using a single queue
- updated remove members from stone circle endpoint
  - allow removing multiple members at once
  - prevent removing creator from the circle

**August 30**

- Review and fix PRs for Moyo while he was at the mosque
- Refactor initialise deposit endpoint to return a reference
- Again, review proposed implementation of transaction processing

### September

**September 2**

- Fix issue with microservice gateway not responding to traffic
  - the port was changed on APIM from 8080 to 80
  - .NET defaults to 8080 when dockerised
- Started researching usable libraries for spatial data
- implemented transaction queue for processing deposits
- removed processor from initialise withdrawal request
  - we only have one processor. even at that, the implementation should not be in consumer hands
- refactored withdrawal implementation to use transaction queue

**September 3**

- Reviewed PRs and gave feedback
- Refactored reverse withdrawal to use transaction queue
  - this is a draft as it is yet to be fully tested

**September 4**

- Reviewed PRs and gave comprehensive feedback
- Researched possible implementations for incidents
  - shared approach with team before finalising on an approach to take
- add endpoint to create an incident
  - created db entities
  - added preseeded incident types based off the design
  - asked devops team to setup postgis on azure postgres db
- removed circleId from endpoint to add circle members
  - users joining a circle would not have the circle id, duh.
  - uses the invite code to add users to a circle
  - added tests to prevent regressions
- update stone circle tests to use a postgis image
- add endpoint to get all incident types

**September 5**

- implemented feedback on admin ledger revenue
  - included comment in PR & codebase explaining approach
- helped moyo resolve fusion auth jwt issues for admin endpoints
  - also documented setup for fusion auth JWTs
- add endpoint to get incident feed
- published deposit completed event after processing a deposit
- fixed bug causing financial service to crash
  - an abstract tag was missing on a base class
- removed unused configuration from azure app config
- reviewed PRs and kicked back against unnecessary endpoints

**September 6**

- review PRs & fix some errors
- add endpoint to get a single incident
- resolve database todos in stone circle
  - make IncidentImageUrl column on Incidents table required
  - rename UserId on Incidents table to CreatedByUserId
  - add index on Location property on Incidents table
- add endpoint to create a comment on an incident
  - add comment entity to db
  - add tests
- allow users to upload images for incidents
  - updated the upload image endpoint. refactored it to remove bloat
- add service to get all comments on an incident
  - fixed a foreign key issue caused by mismatched navigation property names
- add endpoint to delete an incident comment
  - add tests

**September 9**

- review PRs
- work on documentation
- made images optional when creating incidents

**September 10**

- reviewed PRs
- worked on documentation. completed:
  - 1. System Overview
  - 2. Components
  - 3. Configuration, Deployments and Environments
  - 4. Testing & Monitoring
  - 5. Authentication & Authorisation
- assisted Yussuf with onboarding
- added profile image url to user table in stone circle
- fixed issue with residential service crashing on startup
- hangfire was pointed to a non-existent key-value

**September 11**

- reviewed PRs
- assisted Yussuf with onboarding
- completed documentation
  - Known Issues & Future Plans
  - Using The NATS Library
  - FusionAuth
- updated FusionAuth kickstart & pointed documentation to it
- reviewed PRs

**September 12**

- Updated search PR from Moyo to be faster & easier to read
- reviewed PRs
- assisted Yussuf with onboarding
- added feature to validate incidents
- added comment & validation count to incident response

**September 13**

- reviewed PRs
- add feature to flag incidents
- include flaggedByUser and validatedByUser in incidentResponse
- refactor validate incidents feature to use a single endpoint
  - the endpoint toggles between validated and unvalidated

### November

**November 11**

- Started a new role at **BrosPhoneParts**
- Scaffolded the new project foundation.
- Reviewed Shopify's authentication schemes and documented requirements.
- Designed the initial database schema and created the corresponding Prisma models, including adminUser and userLoginService for authentication.

**November 12**

- Implemented Zod middleware for API request validation.
- Implemented user signup with Google OAuth, utilizing the Google service ID to prevent duplicate registrations and generating a JWT upon success.

**November 13**

- Implemented user sign-in with Google OAuth.

**November 14**

- Configured and implemented post-signup email notifications.
  - this included designing a template with handlebarsjs, and setting up Brevo api keys
- Implemented Cross-Origin Resource Sharing (CORS).
- Resolved minor PR comments.

**November 15**

- Refactored the Google signup and sign-in flows to reduce code bloat.
- Implemented a complete two-factor authentication (2FA) flow for password-based authentication, which included:
  - Adding endpoints to toggle and verify 2FA.
  - Creating a new email template for 2FA codes.
  - Adding methods for 2FA token generation.
- Integrated the 2FA process into the Google sign-in flow.
- Refactored the email verification logic to use Google's `email_verified` property, now only sending a verification email if the property is false.

**November 18**

- Updated the CORS configuration to support multiple origins via environment variables.
- Modified the authentication strategy to use Google access tokens instead of credential auth, per a frontend request.
- Refactored token verification, 2FA services, and refresh token logic into single, reusable services and utility functions to reduce code duplication.
- Added refresh token support to the Google authentication endpoints.
- Fixed a bug where new refresh tokens failed to replace outdated ones during sign-in.

**November 19**

- Adjusted the sign-in response to return `verified: false` if a user's email has not yet been verified.

**November 20**

- Added two new rate-limited endpoints: one to resend user verification emails and another to resend 2FA emails.

**November 21**

- Finished the initial implementation of the Auth module and moved on to the Product section.
- Reviewed the Shopify product section, the company's existing store, and official Shopify documentation to gather requirements.
- Designed the schema for product collections.
- Researched methods for creating nested, tree-like data structures in a database.
- Added the endpoint to create a collection.

**November 22**

- Reviewed the complete Shopify category taxonomy.
  - We need to use their categories in our system, thankfully the data is easily accessible.
- Wrote a script to process all 10k Shopify categories, map them to our Category entity, and save the output to a JSON file.
- Wrote a second script to seed the category data from the JSON file into our database.

**November 25**

- Designed and created the database entities for products, product variants, product inventory, and tags.
- Added an endpoint to create a product, with support for both simple and complex (with variants) products.

**November 26**

- Fixed a bug in the product creation flow to assign an "Uncategorised" default if no category is selected.
- Added an endpoint to get subcategories for a given category, for use by the frontend.
- Updated the database model and seed script to store the category breadcrumb for easier navigation.

**November 27**

- Optimized the category seed script by using createMany for bulk insertion instead of iterating through a list of promises.
- Added a `hasChildren` property to the get category API response to inform the frontend when to display UI elements like dropdown arrows.

**November 29**

- Made several database schema enhancements:
  - Added a nullable barcode field to the product variant table.
  - Added a unique constraint on the sku field for variants.
  - Added a vendor enum and a product_type table.
  - Renamed attributes to metafields on the category and product tables for clarity.
  - Added profit and marginPercentage fields to product variants.

### December

**December 2**

- Implemented a dynamic filtering engine that accepts a JSON object and translates it into Prisma where and order clauses. I need to add validation to handle non-existent keys, which would otherwise cause exceptions.

**December 3**

- Updated the Collection model to establish a one-to-many relationship with the Product model.
- Added endpoints to get a single collection and to get all collections.

**December 4**

- Added an `imageUrl` field to the "get all products" response.
- Implemented a check to prevent the creation of duplicate collection names.
- Reviewed the Shopify `store` model to inform the design of our multi-tenant architecture.
- Added `store` and `store_location` entities to the database.
- Enabled an option in the dynamic filtering engine to ignore pagination.
- Fixed a failed database migration by making the new `storeId` field nullable, which allowed the migration to run on tables with existing data.
- Added a many-to-many relationship between product variants and store locations.

**December 5**

- Created endpoints to add products to a collection and remove them.
- Updated the Zod validation middleware to return more accurate error messages.
- Added endpoints to get a single product and to get all product inventory.
- Modified the Product model to make the `category` field non-nullable.

**December 6**

- Added a Zod query schema to validate requests that use the dynamic filtering engine.
- Updated the product creation logic to assign a default "Uncategorised" value when a category ID is not set, which fixed a regression.

**December 9**

- Enhanced the "create collection" endpoint to allow for adding products at the time of creation.
- Added an endpoint to update a collection.
- Made the `parentCollectionId` on the `Collection` model nullable, as it may not be needed.
- Removed the unique constraint on the collection title.
- Set the default value for a product's image URL to an empty string.

**December 10**

- Enhanced product and collection API responses by adding created/updated timestamps and image URLs, and renamed the product id field to productId for clarity.
- Removed the `parentCollectionId` field from the Collection model.
- Added an endpoint to delete a collection.
- Fixed several bugs on the product import endpoint, including logic to create default variants for simple products, filter out empty tags, handle additional variant images per Shopify's specification, exclude the default variant from the variant count on complex products, and return actual product stock levels.

**December 11**

- Added an endpoint to update a product.

**December 12**

- Added an endpoint to export products to a CSV file.
- Fixed a bug related to incorrect image position indices during import.
- Added validation to ensure imported variant images adhere to Shopify's format.
- Added a `metafields` field to the product model and an `isSimpleProduct` boolean to API responses to help the frontend differentiate product types.
- Enforced a maximum of three options per product.
- Established a relationship between the `storeLocation` and `inventory` entities.
- Enforced that tags, vendors, and product types are unique on a per-store basis.

**December 13**

- Added a utility method to generate pagination metadata for API responses.
- Fixed a failed deployment that was caused by missing a unique query constraint when creating and fetching tags, vendors, and product types.
- Added the `storeId` to all collection-related routes and entities.
- Deployed the application to the Render platform using a blueprint configuration.

**December 16**

- Added the `storeId` to all product-related routes and entities.
- Enabled the frontend to update product metafields.
- Modified the product export endpoint to return a downloadable file.
- Added a `weightUnit` enum to the `Product` model.
- Fixed a bug on the product import process to correctly capture the product barcode, and subsequently removed the unique constraint on the barcode field.
- Updated the "get all inventory" endpoint to correctly filter by location.
- Implemented logic to reassign inventory when a store location is deactivated.

**December 17**

- Performed miscellaneous codebase housekeeping, including renaming models and adjusting types.
- Made the `store` and `store_location` relationships non-nullable across all relevant entities.
- Added a unique constraint to `productInventory` to ensure a variant can only appear once per location.
- Added `barcode` and `sku` to the product API response.
- Set the `storeId` automatically when creating new inventory records.

**December 18**

- Moved the `validateProductTags` function to a dedicated product utility file.
- Re-implemented support for adding and removing collections or tags when updating a product, as this functionality had been accidentally removed.
- Added `weight`, `weightUnit`, and variant images to the product API response.

**December 19**

- Changed the inventory API route from `product/inventory` to `/inventory` for better semantics.
- Removed the unique constraint on the product title.
- Implemented logic to append a millisecond timestamp to a product slug if it already exists, preventing unique constraint errors on creation.
- Added a new unique constraint on the combination of a product's slug and store.
- Updated the product export feature to return a downloadable URL instead of a file stream.

**December 20**

- Refactored the dynamic filtering implementation to parse the query string directly instead of a JSON object. This update creates a query object for Prisma and allows for precise control over which fields and operators can be used.
- Removed all uses of Zod's `.default` clause due to its unreliable behavior, replacing it with `.optional` and a manual default value fallback (e.g. `x || 0` ).

**December 23**

- Replaced all remaining uses of the old dynamic filtering code with the new implementation.
- Updated the product creation logic to always create a default variant, even for complex products.
- Refactored the product update logic for improved code legibility.
- Removed the old dynamic filtering code from the codebase.

**December 27**

- Added metafields to the "get category" response.
- Implemented logic to either add a new metafield value or add a value to an existing metafield on products.
- Merged product and category metafields into a single, unified object in the API response.

## 2025

### January

**January 6**

- The holidays are over. back to work 🙁
- Began work on the Customer and Timeline sections.
- Reviewed Shopify's customer and timeline features to gather requirements.
- Designed the database schema for customers and timeline entries and created the corresponding models.
- Updated the "update product" endpoint to support category, product type, and vendor changes.

**January 7**

- Updated the customer table to include a `language` field, an optional `first_name` on addresses, and a new `phone_number` field on addresses. Renamed several columns for clarity.
- Linked the customer tags and customer models to the store.
- Introduced a new `render-build` script to resolve out-of-memory exceptions during deployment by moving build commands into the build process, which has a higher memory allocation.
- Re-implemented logic to associate existing products with a collection during creation, including a validation utility to ensure products exist in the store.
- Updated the tags table to a generic model supporting multiple entity types (e.g., Product, Customer) via a `type` column, simplifying the schema.
- Added an endpoint to create a customer and an endpoint to get a single customer.

**January 8**

- Added an endpoint to get all customers.
- Fixed a bug in the "get all inventory" endpoint where the storeId filter was accepted but not applied.
- Added a static JSON file with country data and updated the `tsconfig` to allow JSON imports.
- Added an endpoint to fetch and search for countries.

**January 9**

- Developed a full suite of endpoints for customer data management, including:
  - Creating, updating, and deleting customer addresses.
  - Updating customer contact info.
  - Updating customer tags and notes.
- Updated the customer response object to include notes and status.
- Set the max length for the notes field to 5000 characters in the database.
- Added a generic endpoint to retrieve the timeline for any entity.

**January 10**

- Implemented a new timeline event that is created whenever a customer's email is updated or added.

**January 13**

- Added an endpoint to merge customer profiles.

**January 14**

- Added the createdAt timestamp to the customer response object.
- Added placeholder values to the customer response for better frontend handling.
- Added an endpoint to preview a customer import.

**January 16**

- Updated the merge customer endpoint to allow users to specify which contact info or address to retain.
- Removed the now-redundant endpoint for previewing customer imports.
- Added an endpoint to import customers from a file.

**January 17**

- Implemented a new timeline event that is created when customer notes are updated.
- Refactored the file upload endpoint to support all file types.

**January 20**

- Added endpoints to add and delete comments on the timeline.
- Added a unique index on the combination of customer email, phoneNo, and store to prevent duplicates within a store.
- Upgraded the Prisma version to 6.2.1 to fix a bug that was generating incorrect migrations for our schema, and audited all packages during the update.

**January 21**

- Added an endpoint to search for entities when creating a timeline comment.
- Fixed a bug in the product import where an optional CSV header was being incorrectly marked as required.

**January 22**

- Refined the upload file endpoint to remove unnecessary fields from the response and only return the file size and extension.
- Enabled attaching files with a specified size and extension when commenting on the timeline.

**January 23**

- _Began work on the Order and Draft Order sections._
- Reviewed Shopify's order and draft order implementation but shifted to a simpler approach based on direct user requirements.
- Designed and implemented the initial database schema for orders.

**January 27**

- Added an endpoint to create a draft order

**January 28**

- Renamed order-related entities to align with existing model naming conventions.
- Added an endpoint to search for products (across collections, tags, vendors, etc.) when creating an order.

**January 29**

- Updated the inventory model to match Shopify's structure, adding `onHand`, `committed`, `unavailable`, and `incoming` fields and renaming `quantity` to `available`.
- Updated all code referencing the old inventory.quantity structure.
- Removed a unique constraint on product variants in the inventory table, allowing a single variant to have multiple inventory records at different locations.

**January 30**

- Optimized a middleware that checks store ownership by removing an unnecessary query.
- Started development on the "create order" endpoint.

**January 31**

- Finished the "create order" endpoint, which now handles order entity preparation, inventory deduction, location assignment, and timeline entry creation within a single, short-lived transaction.
- Updated the product mapper to return different response shapes for simple vs. complex products, including an `isSimpleProduct` boolean.
- Added the `phone_number` to the "get all customers" response.

### February

**February 3**

- Removed the `InvoiceSent` status from the `DraftOrderStatus` enum.
- Set the draft order status to `completed` when an order is created from it.
- Established a one-sided, one-to-one relationship between draft orders and orders.
- Added `weight` and `weightUnit` to the product search response for orders, and renamed id fields to `productId` and `variantId` for clarity per a frontend request.

**February 4**

- Added a contact info object to draft orders, allowing users to add custom address information independent of a customer's record.
- Removed complex logic that automatically updated a customer's profile from the order creation flow.
- Fixed a bug on the "create order" endpoint where a product variant was being connected even when not provided in the request.

**February 5**

- Added timeline events for when a customer's phone or email is modified.
- Added validation to prevent duplicate phone numbers during customer creation and to ensure a new customer has at least a first name, phone, or email.
- Added the contact information object to the main order entity.
- Added an endpoint to create an order directly from a draft order.

**February 6**

- Added endpoints to duplicate and update a draft order.
- Fixed a routing issue where requests were being handled by the wrong order routes due to incorrect ordering in the route file. Resolved by creating a separate file for draft order routes and reordering them.

**February 7 - 11**

- Began work on the Discount module.
- Conducted a thorough review of Shopify's discount system.
- Authored a Product Requirements Document (PRD) and other documents defining requirements for each discount type.
- Designed the discount schema using Zod's discriminated unions to cleanly model the 8 different discount formats (2 methods x 4 types), which simplifies validation and type inference.
  - With discriminated unions, typescript can infer a different shape which makes it easier for us to reason about the discounts. If a discount is method A, and type X, we don’t need to think about its other properties.

**February 12 - 14**

- Implemented custom discounts on draft order items.
- Implemented order-level discounts on draft orders.

**February 17 - 20**

- Updated the order-level discount schema for better clarity.
- Refactored the "update draft order" logic, breaking the code into smaller functions and removing bloat.
- After encountering excessive complexity in the discount implementation, I deleted all discount-related code and restarted the implementation from scratch.
- Implemented the new, simpler discount logic for creating and updating draft orders.

**February 21**

- Added an endpoint to get all eligible automatic discounts for an order.
- Updated the "get draft order" response to include applied discounts, with the item ID and discount title/code.

**February 24**

- Added an endpoint to validate discounts for an order.
- Implemented the application of discounts during the "create order" and "get single order" flows.
- Updated timeline endpoints to support commenting on and referencing orders and draft orders. Removed the `updatedAt` field as timeline entries are immutable.
- _Began work on Shipping Methods._
- Reviewed client requirements and the schema designed by a teammate.
- Implemented a full suite of endpoints for managing shipping methods (create, get, get all, update, delete).

**February 25**

- Separated the "get single discount" response from the "get all discounts" response for tailored outputs.
- Implemented a function to generate a human-readable discount summary based on its properties (e.g., "$10 off 5 products | For 3 customers").
- Added a missing property to the "amount off products" configuration to support applying a discount to a single item on an order, rather than proportionally splitting it.
- Reviewed the discount update implementation and proposed an alternative ID-based approach to prevent bugs caused by tracking changes via non-unique item names.

**February 26**

- Restructured the "amount off products" discount model to be easier to work with on the backend and represent on the frontend.
- Updated the applyDiscount and discount summary methods to reflect the new structure.

**February 27**

- Added logic to create a set of default shipping methods when a new store is created.
- Wrote a one-off SQL script to generate default shipping methods for existing stores that lacked them.

**February 28**

- Added an endpoint to preview a draft order.
- Started implementing the logic for applying shipping to orders, including receiving the shipping method and adding its cost to the order total before applying discounts.

### March

**March 3**

- Finished the implementation of applying shipping costs to orders.
- Updated the create, get, and update order endpoints to reflect the new shipping logic.

**March 4**

- Added the discount summary object to the main order and draft order entities.
- Implemented a temporary fix for a data mapping issue in the preview draft order endpoint.

**March 5**

- Reviewed a teammate's PR for the admin "payments" feature and updated the implementation to simplify the original design and improve code clarity.
- Wrote API documentation for the new payments feature.
- Updated the "preview draft order" implementation by creating the draft order in a transaction, mapping it to a response, then rolling back the transaction.
  - We had three options. The option I chose gives us all the data we need for the mapping to be correct, without an extra maintenance burden from creating a mock draft order
  - other options were:
    - creating a mock draft order and calling the mapper (or using a custom mapper)
    - creating the entities, and deleting each afterwards (the transaction makes this easier)

**March 6**

- Added missing properties to the discount object in the "get draft" response.
- Fixed a bug where the order total was calculated incorrectly due to percentage-based discounts being reapplied.
- Fixed the logic for fetching the best discount to correctly include FreeShipping discounts, which were previously excluded because they have no "value".
- Mapped eligible automatic discounts to the format expected by the frontend.
- Excluded the default variant from the variant array in the response for complex products.

**March 7 & 10**

- Added endpoints to delete a draft order, archive/unarchive an order, update discounts, and activate/deactivate discounts.
- Fixed bugs in the discount application logic:
- Ensured cascading discounts apply to the remaining subtotal after a previous discount.
- Corrected the calculation for percentage-based discounts.

**March 11**

- Added an endpoint to duplicate an order

**March 12**

- Added logic to validate discount combinations and return user-friendly errors for invalid combinations.
- Fixed a bug when searching phone numbers
  - Input comes from query parameters. In query parameters, '+' is converted to ' '. I replaced the decode function in `qs`, express’ query parser, to decode the uri component instead. We also trim the input to remove whitespace.

**March 13**

- Updated the "get discount" response to conditionally return either `title` (for automatic discounts) or `code` (for code discounts). The other field would be `undefined`.

**March 14**

- Fixed a bug in the "create order from draft" flow by generating a new UUID for each item to prevent unique constraint violations.
- Added a `product_count` field to the "get single collection" response.

**March 17**

- Began a major revamp of the background job scheduling system.
- Implemented a singleton `JobScheduler` class to manage all job methods.
- Configured system jobs and workers to register on application startup.
- Added a README file to explain the new job scheduler architecture.
- Scheduled jobs for discount creation and updates, adding a 5-minute leeway to the start time to account for minor clock drift.

**March 18**

- Designed a new, centralized email service.
- Created a singleton EmailService class to consolidate all email methods.
- Replaced all existing direct email calls with the new service.
- Refactored all email sending to be asynchronous via the new background job system, using a single `pgboss` worker to process the email queue.

**March 19**

- Updated the discount response to include the list of selected customers when applicable.
- Created a new `StoreReceiptSettings` entity and added endpoints for its management.
- Ran a script to create default receipt settings for all existing stores.

**March 21**

- Added an endpoint to get all data required for an order receipt (store details, receipt settings, order info, etc.).
- Added an endpoint to send an order receipt email, which uses Handlebars for templating and Puppeteer to generate a PDF attachment, all processed via a background job.

**March 24**

- Fixed a bug in the order and draft order duplication endpoints where discounts were not being copied over, and the order total was being copied instead of recalculated, leading to inaccurate totals.

**March 25**

- Refactored the job scheduler and email service to use a generic `Job<T>` interface. This resolved type-safety issues and simplified tracking the data payload for each job.

```ts
/**
 * Interface representing a job that can be scheduled and executed
 * @template T - The type of data that will be passed to the job handler
 */
export interface Job<T extends object> {
	/** The unique name identifier for this job type */
	name: JobName;
	/** The entity type this job operates on */
	jobEntity: JobEntity;
	/** Handler function that executes the job logic with the provided data */
	handler: (data: T) => Promise<void>;
	/** Whether this is a system-level job that should use singleton policy */
	isSystemJob: boolean;
}
```

- Made the store_email field non-nullable in the database, ensuring it is always set upon store creation.

**March 26**

- Resolved outstanding to-dos, including moving utility functions to correct namespaces.
- Fixed an occasional unique constraint violation during customer creation.
- Added validation to search endpoints to require both a `search` term and `searchFields` to be provided, preventing inconsistent behavior.
- Added inventory and location details to the product response.

### April

**April 9 - 10**

- The BPP team was moved to work on FixMasterPos, the other product in the company.
- I was assigned the import products endpoint and tasked to update it to support variable products.
  - First, off I updated the csv format to accept more headings.
  - Added code to do simple validation (check skus are available, check required headers are passed)
  - Added code to handle the different types of products (serialised, simple and variable).
  - Added new types to represent the product db model
- I was also asked to fix the formatting of a text message sent to users when products are available for repairs.
  - This had many issues. It seems sendgrid/twilio have finicky handling of texts, and there’s no clear documentation for it either. I ended up going in circles on a relatively simple feature and nearly lost my mind.
  - Babz asked me to let it be after a few bug reports, and re-fixes.
- Fixed a bug in the dashboard analytics where data was invalid due to incorrect timezone handling. Refactored the endpoint to correctly parse the user's timezone, calculate date bounds, and remove dead code.

**April 14**

- Improved the product import endpoint with stricter CSV validation to ensure correct row formatting.
- The importer now flags duplicate SKUs, prevents duplicate rows for simple products, and returns all processing errors to the caller.
- If an imported SKU already exists, the system now updates the product details and adds inventory to the specified location.
- Standardized the format for option names to use hyphens instead of slashes.
- Ensured that new inventory is created at all store locations during an import.

**April 15**

- Added a new endpoint to export products in the updated CSV format, maintaining the same API design as the original export but on a different route.

**April 16**

- Fixed a bug on the export products endpoint where quantity was not being returned for simple/serialized products due to fetching from the wrong data source.
- Fixed a validation bug in the import process where a numeric field with a value of 0 was incorrectly reported as a missing field.

**April 17**

- Made changes to the import products flow
  - Ignore duplicate handles when importing simple/serialised products instead of reporting errors.
  - create specified categories and vendors in store if they do not exist
  - create image entities in DB if a product had an imageUrl provided in the CSV
- Fixed an issue on the get product endpoint
  - The `categories` field had duplicate fields for its foreign key. I added a transform to the `toJSON` and `toObject` methods to replace the categories object with a single field, instead of a weirdly nested object. A crappy hotfix, but a fix nonetheless.

**April 22**

- Removed old, unused product export endpoints.
- Fixed the export products endpoint to fetch inventory from the user-selected location instead of the store's default location.
- Implemented hotfixes for the import process
  - The file model (used to store images) includes a virtual method. This virtual would prefix the FMP s3 bucket to file URLs. But, when users import a product with an image URL, we should not be prefixing another URL to it.
    - To fix this, i updated the virtual to check if the path is a url before adding a prefix
  - use toLowerCase on option names
    - when a product is created, the attributes on the product are saved with their capitalisation preserved. While the attributes saved on the variations are stored in lowercase
    - when exporting, we compare using the lower case name to ensure all option values are passed

**April 24**

- Set variation SKU in findOne hook for orders
  - When retrieving orders with variable products, the SKU value for product variations was not being properly populated in the response. The frontend was receiving null for the SKU field despite the variation having a valid SKU value.
  - The order model includes a find one hook. I added a branch in the hook to retrieve the variations sku and assign it the main product body.

**April 25**

- Started development on the "Custom Store Payment Methods" feature.
  - Currently, there are a set of payment methods that can be used by customers to record a payment in their store. Now, they want to allow users to add custom payment methods for their stores.
- Created default store payment methods
  - added StorePaymentMethod model
  - add nullable storePaymentMethodId to Payment
  - create default store payment methods for a store when a store is created
  - moved create store method to handler method to reduce clutter in controller
- added endpoints to create, update and get custom payment methods
  - changed the names of certain default payment methods to support frontend translations. e.g `payment_link`, or `debit_credit_card`
- added a check to prevent users from creating duplicate payment methods
- Fixed an issue in the product export where slugified attribute names (e.g., screen-guard) from the frontend were not matching the stored values.
- Added a check to ignore `name` input when updating system payment methods
  - users cant rename system payment methods, so the code simply ignores `name,` if provided.

**April 28**

- Fixed a bug in the update/duplicate product endpoints that could, in rare cases, generate a non-unique product handle. Added checks to ensure handle uniqueness and to regenerate it if the product title changes.

**April 29**

- Removed all old product export code as part of the final migration to the new functionality.

**April 30**

- Added a new "create payment" endpoint as part of the custom payments feature. This included adding a new Zod schema, an isRefund boolean, and enums for default payment methods to allow for type-safe queries.
- Fixed a series of complex bugs related to the inventory adjustment history after product imports.
  - QA mentioned that when variants are updated, adjustment history entities are not created after imports. This was caused by a myriad of issues, from variant ids being lost during imports to strings actually being object ids when debugging.
- Added an endpoint to cancel orders using `storePaymentMethodId`.

### May

**May 1**

- Updated the finance analytics endpoints to use the new store payment methods for aggregations, refactoring and adding types where necessary.

**May 2**

- Changed the names of the default store payment methods for clarity and consistency.

**May 5**

- Added paymentMethodId to the finance report response, as requested by the frontend team.

**May 6**

- Updated the "view order" response to return the payment method name and option.
  - This was implemented using a model hook to avoid modifying the complex receipt generation code.

**May 7**

- Added a `type` parameter to the "get all orders" and "get finance orders" endpoints to allow filtering by store payment method.
- Updated cash register functions to group payments by payment method ID instead of by the option string.
- Added a user-friendly error to prevent creating or updating a payment method with a name containing only spaces.
- Added a safeguard to prevent users from disabling a payment method if it is the last active one.

**May 8**

- Added filtering by the `isRefund` property to the finance/orders endpoint.
  - QA reported that payments appeared 'duplicated' on the finance page because the page was only filtering by payment method and not by refund status. This change ensures that, for example, clicking 'cash' shows only cash payments, not cash refunds.
- Added default values for `isDefaultTaxActive` (true) and nonTaxableAmount (0) to the database model.
  - I traced a bug where tax was not being calculated on some orders to these missing default values. I set the defaults in the model and ran a migration to update all existing orders.

**May 9**

- Updated the finance breakdown to return the net payment amount for each payment method.
  - QA reported that refunding a payment did not reduce the total for that payment method in the finance breakdown. The code now returns the net inflow (with a minimum of 0) to correctly reflect this.
- Fixed a bug where the order total was calculated incorrectly if a product was removed, because the logic did not check if tax was active before applying it. The fix was a one-line change.
- Implemented a new finance breakdown that returns inflow and refunds separately, per a request from management.

**May 12**

- Updated the cash register breakdown endpoint to return a summary of all payment methods, showing the net inflow for each and excluding any with a value of zero or less.

**May 14**

- Added an endpoint to edit order payments, allowing users to change the amount, payment method, tax, or discount for credit payments. Changes are reflected in the order timeline.
  - payments made with terminal or payment link can not be updated and users also may not change the payment method used to terminal or payment link.
  - cancelled, refunded or pending orders can not be updated.
  - only credit payments can be updated.
- Fixed the time filter in the cash register payment breakdown.
  - Payments were not appearing correctly within an open cash register session due to timezone complexities. I changed the logic to fetch all payments after the session start time for open sessions, and to use the session end time as a boundary only after it is closed. Because if it is still open, that must mean any payments made after the start time are within the session.

**May 16**

- Made minor fixes to store payment methods, including updating enum names to match frontend expectations and preventing users from disabling Stripe-linked payment methods.
- Fixed a bug with payment links and cash register sessions after investigation & a chat with Oladipo
  - QA reported that payment link transactions made during a cash register session didn't show up as expected.
  - Here's the result of my investigation:
    - In the create payment endpoint, a stripe session is started to create the payment link and we store the timezone in metadata. The method completes, and returns a payment link to the user.
    - The user uses the stripe link to make a payment. The system receives a webhook and calls `order.updatePaymentStatus`. The timezone stored in session metadata is retrieved and passed to `order.updatePaymentStatus`.
    - Inside `order.updatePaymentStatus`, it sends a request to the create payment endpoint (weird but whatever). the timezone stored in metadata is passed in the `x-timezone` header.
    - Here's where the problem lies. The timezone header isnt used, instead `parseDateString` is called, and it uses the ip address of the caller to get the date. Since this request is being made by the server, to the server - this date is the server date. This server date is in a different timezone compared to the user who initially called the create payment endpoint.
    - As a result, the created payment entity ends up outside the cash register time window, because of timezone differences.
  - Solution: I added an `isWebhook` boolean to the payment endpoint. By default, it is false. If it is true, we take the date from the timezone header. otherwise, we use `parseDateString`.

**May 20**

- made `storePaymentMethodId` optional when cancelling an order. Unpaid orders can be cancelled too! In that case, they don’t need to select a payment method for the refund.
- removed old endpoints and fields as part of store payment methods migration
  - removed the old create payment endpoint and changed the route of the existing one (there’s no API versioning and it’ll take too long to implement).
    - old route: POST /payments/new
    - new route: POST /payments
  - removed old cancel order endpoint
  - remove option field from Payment model

**May 21**

- Ensured correct monetary symbols are used in the edit payment timeline (e.g., % for tax values, store currency for currency values).

**May 22**

- Started development on the "Location-Based Pricing" feature. In a nutshell, products are stocked at different locations. Now, users will be able to set a price, cost and minimum price at each location. They can also disable the product at that location, or disabled location based pricing entirely for the product or variation.
- Updated the product model and added new types to support setting price, cost, and minimum price per location.
- Fixed error caused by vendors during product imports
  - Default values are not set for website, address and phone when we create new vendors. This caused errors in other parts of the application.
  - I added default values to the model and updated the db to set these default values for existing documents.

**May 23**

- Added an endpoint to create a product with location based pricing
  - Ensures at least one location is active when using location-specific pricing
  - Validates that all required pricing fields are provided for each location
  - Verifies all specified locations belong to the store
  - Maintains existing behaviour when useLocationSpecificPricing is false
  - Default product pricing serves as fallback
  - No changes required to existing product records
- Added an endpoint to update products with location based pricing

**May 26**

- Updated the "get all products" endpoint to return the `useLocationSpecificPricing` flag for the frontend.
- Updated the `priceRange` virtual on the product model to correctly calculate a price range when location-based pricing is enabled

**May 27**

- added location based pricing to variable products.
  - Alex said he wants customers to be able to set location-based pricing for each variation of a product.
  - I updated the product model, the validation schema, the create/update endpoints and the `priceRange` virtual.

**May 28**

- Refactored the add product to cart endpoint. This was a big change. I went through the add product to cart flow on frontend and backend, and discovered that both sides are out of sync. The backend expected fields that weren't sent by the frontend, which meant most of the code there did nothing.
  - I separated the zod input schema from the db models. I don't know why they were tied together in the first place, but this change allowed me to remove the unneeded fields from the input.
  - Refactored the `addProductsToCart` function. It is now easier to gloss over and comprehend, without sacrificing the functionality.
  - Changed how the price data is gotten for simple/serialised/variable products. The frontend should not be trusted for price data on these, so what this function does is use the product (and variation id for variants) to fetch the product and get the correct price. This price is stored on the product in the cart, and the cart is passed to `cartModifier` to calculate totals.
  - Most importantly, I implemented location-based pricing where the backend fetches correct pricing based on the provided locationId - checking `useLocationSpecificPricing` settings for both simple/serialised and variable products. For location-specific pricing, it fetches from inventory matching the locationId; otherwise, it uses root product/variation pricing.

**May 29**

- Refactored the `cartModifier` function. Another massive change to improve readability, and I couldn’t possibly detail all 778 lines of it here.

**May 30**

- Updated the "get all products" endpoint to exclude products that are inactive for the user's currently selected location.

### June

**June 2**

- Implemented soft delete for users
  - Babz mentioned a bug where:
    - an order is created by a team member in a store.
    - the team member is deleted.
    - the user no longer exists and the relation to the order is broken
    - the order page fails to load
  - after discussion with the team on a possible solution, i implemented the following:
    - Added a new timeline field to track user account history
    - Timeline entries include: title, comment, date, and who made the change
    - Made commentedBy field required for better audit tracking
    - added originalEmailHash to store hashed email after deletion
    - Instead of hard deletion, user data is now anonymised:
      - Email changed to `deleted_user_{userId}@deleted.com` (keeps it unique)
      - Name changed to "Deleted User"
      - Phone and address cleared
    - Creates a timeline entry documenting the deletion with original email hash for audit purposes
  - i also updated all user-related queries to exclude deleted users.

**June 3**

- Updated the product import process to make all imported products active by default at all locations.
- Fixed the low inventory email to correctly display the full variation name and SKU for variable products.

**June 4**

- Fixed a bug in the cart where the ID of a repair item was being lost during a recent refactor.

**June 5**

- Fixed a 500 error on product create/update caused by a type casting issue.
  - _Investigation Result_: The frontend was correctly sending a null vendor ID, but our Zod schema definition `z.string().optional().nullable()` was causing the Fastify framework to parse this `null` into an empty string, which Mongo could not cast to an ObjectId. I fixed this by changing the schema to `z.string().nullable()`, which generates the correct JSON schema to handle `null` values properly.
- Removed old create/update product endpoints as part of location-based pricing migration.
- Fixed payment method translation on receipts
  - There’s an endpoint to send receipts to a specified email address. This receipt includes the payment methods used in the order.
  - As part of the custom payment methods implementation, certain payment method names are written with underscores, like: `payment_link`. This allows the frontend to translate them consistently into the store’s chosen language.
  - But of course, this underscored version would look weird on a receipt. This change gets the payment link names, converts them to an English language equivalent, then translates that equivalent into the store’s location. The translated value is included on the receipt.
- Discussed with Oladipo and the backend team about potential optimisations for the backend system. We will start next week.

**June 10 - 11**

- Started the optimisations today. I was assigned the get all customers endpoint.
  - The existing code had a classic N+1 query:
    - Fetch all customers with filters (1 query)
    - For each customer, make 2 additional queries:
      - Count their total orders
      - Fetch all their order details for aggregation
  - This meant 200+ database queries for just 100 customers.
  - Solution
    - Replaced the N+1 pattern with a single MongoDB aggregation pipeline
    - Added necessary database indexes
    - Removed unnecessary data from the response
  - Results
    - From 200+ queries → 1 aggregation query
    - P90 response time now under 1.6 seconds

**June 12**

- Added code to auto update all products in a store under certain conditions. This uses agenda to queue a background job which handles the processing.
  - When a store creates a new location, the products within the store will have the locations added to their inventory.
  - when a location is enabled or disabled, all products within the store will have the location enabled or disabled.
- Update the validation on the create product endpoint to allow users create products with status as inactive
  - Also created an enum to represent all possible product statuses.
- Update the error message returned when a user misspells iPhone in a serialized product title
- Other tiny bug fixes to validation on get customers and create vendor endpoints.

**June 13**

- added id and name to get customers endpoint, as requested by the frontend
- added a fallback value for store currency when adding timeline entries on the update order endpoint. Specifically, there was a bug where we saved “Discount of undefined100 was applied for product”, where undefined should have been a currency.

**June 16**

- added structured logging to the product import process - for observability
  - QA reported an error (that wasn’t actually an error), so this allows us to see what went down without straining and guessing
- added types for store and store location models
- changed the 404 error message returned by the destroy cart endpoint when the cart does not exist
  - the old message said “invalid input data”, which was not helpful at all.

**June 17 - 19**

- updated the edit order endpoint to support editing tax, tax id and discounts
  - edits are reflected in the order timeline
  - changes to discounts on custom products are also reflected in the order timeline
- fixed bug with users not being able to add issues to repair products in a cart
  - while refactoring the cart module, i skipped over a function that handled this case. To fix it, I simply hooked it up into the new code.
- optimised inventory mapping when fetching a product
  - The old code would iterate over each inventory item, then fetch the location to get the current name.
  - Now, rather than making a db call for each inventory item, the code fetches all store locations & places them in a map. The map is used to assign the inventory name.
- Fixed bug with attributes not being returned on variations in variable products.
  - The attributes on variations are stored using a Map. I defined a transform on the toJSON function on the order model to get the entries from the attributes map. toJSON has `flattenMaps` set as true by default, which strips functions from the document. This includes the function needed to get the entries from the map. I set `flattenMaps` to false, and this solved the problem.

**June 20**

- fix bug with tag updates on the order timeline
  - previously, changes to tags weren’t recorded on the order timeline. i fixed this by ensuring tags in the request were a valid array before comparing to the existing tags on the order
  - i also updated the comments in the timeline, to specify what the new order tags are after an update.
- replaced toJSON with toObject on the product model.
  - it turns out my understanding of when toJSON is called was wrong. I removed the flatten maps config, and use toObject (which by default, does not flatten maps).
  - the toObject method is called on the get all products endpoint. The transform replaces the wrongly nested categories relation with a ‘normalised’ version.
- pushed a small refactor to the get all products endpoint
  - created a function to get the search filter
  - moved the location filtering into the top-level query, instead of remapping the data returned from the db
    - there’s a function that would filter returned products by location, instead of doing that, i moved the location filtering into the top-level db query so that any products returned would be in the specified location.

**June 24**

- Started improving the import products feature
  - added indexes to category, location and vendor models. These should improve the query performance.
  - used a map to store categories, vendors and locations. The previous code would make DB queries for each check, now all data is fetched beforehand and stored in the map. As new categories or vendors are created, they are added to their respective maps.
    - I also performed the queries for each piece of data in parallel.
  - Used `request.log` instead of logger so the request id is correlated with logs.
  - implemented bulk creation and updates for product imports using `bulkWrite`.
  - made a fix to the import products logic so that the slugified version of the attribute name on a product is stored in variations

**June 26**

- continued with the import products feature
  - only synchronously process imports when there are less than or exactly 50 products on file
  - process files with more than 50 products in the background
    - this uses agenda to enqueue a background job
  - generate and log importId to track all processing for a single import job
- use AsyncLocalStorage to store request logger
  - Prior to this PR, I was using request.log to include the request id on each log message. Including the request id makes it easier to track every log for a request.
  - However, this required passing the request object to every function. This became a problem when I needed to write the background handler code for imports with more than 50 products. The helper functions I planned to reuse expected a request object.
  - I could either make the request object optional, and fallback to using the default logger, or find a way to magically include the request id (if it exists) in logs, without breaking the code where logger is already used.
  - AsyncLocalStorage (ALS) allows us to store state within the lifespan of an async operation, like a web request. This PR updates the logger to use it.
  - When fastify receives a request, it saves the request log object in ALS. When the logger is used, like `logger.info()`, it fetches the logger from ALS, and if that doesn't exist, uses the default pino logger.
  - Existing uses of logger are unaffected, and we will now have a request id on each of our logs. This will be helpful when tracing issues.
  - This change doesn’t break existing uses of logger. Existing code is unaffected.
- Refactor get all products search query
  - The search query used an OR condition to match the location & the search filter. This interaction caused the query to fail, or not work as intended.
  - To fix this, I used an AND query instead, and it seems to have improved this.
    - Now the query is something like: “if the product inventory is this location AND matches the other search parameters, include it”
    - Before, it was: “if the product is in this location, or matches these search parameters, return it”

**June 27**

- made a couple fixes to repair product handling on the cart
  - i cherry-picked the fixes i previously made on main to beta (allowing adding issues to existing repair products)
  - made a fix to tax calculation to ensure it is negative
  - added `totalRepairDevices` to the response. it represents the total number of devices being repaired. If there are two iPhone entries, they each count as a repair device.
  - add multiple entries for a repair device if the quantity is \> 1
    - if a user adds an iPhone with 3 issues and quantity of 2, we will have two iPhone entries on the cart
- more updates to import products
  - during background processing, imports are now processed in batches - 50 at a time. This is not configurable at the moment.
  - return summary after importing \<= 50 products. The stats include created, updated and the number of errors.

**June 30**

- more updates to import products
  - return an importId to the frontend when queuing imports. This id is included in all logs, making it easier to track the progress of a product import.
  - return a summary after importing fewer than 50 products

### July

**July 1**

- more updates to import products
  - added an email template for import summary
  - added an agenda job to send emails after imports complete
  - added real time progress tracking with websockets
    - Import endpoint now queues job with 10s delay (gives frontend time to connect to websocket)
    - New websocket route /ws/import-progress that clients connect to using the importId in headers
    - Progress updates are sent during import: ongoing while processing, completed with summary when done
    - Server closes websocket connection after sending final message
    - This uses the fastify websocket plugin. Active connections are stored in a map keyed by importId.

**July 2 - 4**

- more updates to import products
  - I found that the JS websocket API doesn’t support headers, so now it instead fetches the importId from query parameters
- Fixed a bug with the low inventory email sent to customers.
  - Sometimes, undefined would be included in the product title for simple and serialised products.
  - I fixed this by adding a check on product type to make sure it is ‘variable’, before checking the variation field for a title.
- made fixes to the finance report endpoint
  - removed a bunch of dead commented code
  - corrected a filter for serialised products which checked for products with type == ‘electronics’, instead of ‘serialized’.
  - added a step to the aggregate query to count the amount accrued on service products

**July 7**

- Added support for imei when importing serialised products
  - discussed with Alex about the best way to format the CSV to maximise UX
  - added tests for the existing CSV validation logic
  - updated validation & product creation logic to support imeis
- Added support for imei when exporting serialised products
  - now the products can be exported in the format they are expected to be imported in.
- Fixed build errors caused by test configuration

**July 8 - 28**

We had a long ass break.

**July 29**

### August

**August 13**

- Promoted to team lead while Oladipo writes exams. Handling code reviews and big picture stuff. All days from here till he returned included reviewing 1-5 PRs.
- Added Biome to the repository for formatting & linting. Added simple CI to check codebase builds.
- Working on integration testing using test containers & jest.
- fixed a bug with the GET repairs endpoints by returning all data required by the FE

**August 14**

- Added an index recommended by Mongo Atlas to the repairVariants model
- Added a missing populate to GET repairs

**August 15**

- Finished v1 of integration tests on the vendors module.Tests can be run with yarn:test. yarn:unit or yarn:integration. also:
  - moved unit tests to tests/unit/
  - setup cron jobs with agenda, not node:cron
- Updated order analytics query to filter out orders with the ‘cancelled’ status, not ‘archived’

**August 18 - 19**

- excluded refunded payments from dashboard analytics '- for correctness. Refunds don't count towards profits.
- Tried debugging why TS performs poorly on my system. Ended up removing @types/mongoose and a duplicate tsc package from our package.json. I used microsoft/typescript-analyze to figure out which parts of our type check took longest.

**August 20**

- added a missing populate on storePaymentMethodId in the GET last order receipt endpoint. This populate adds the storePaymentMethod name for use by FE.
- update the logic around order payment status updates to set the status to ‘cancelled’ when an order is refunded, instead of ‘archived’. Also refactored the conditionals into helper functions so they are easier to read.

**August 21**

- Updated build scripts to support tests.
  - **Problem**: When I added tests, I had to update tsconfig.json by changing the root directory from 'src' to '.' so that test files could be compiled. However, this change broke the yarn build script.
  - **What went wrong**:
    - **Before**: The dist/ folder contained the direct contents of src/ (like dist/utils/)
    - **After**: The dist/ folder now mirrors the project structure (like dist/src/utils/)
    - **Issue**: The build script tries to move a repair guide file into dist/utils/, but this directory no longer exists—it's now located at dist/src/utils/
  - Solution: Since it was difficult to determine where the application accesses files throughout the codebase, I updated the build script instead:
    - Fixed the directory structure: After TypeScript compilation, the script now creates a utils/ folder directly in dist/, allowing the file move operation to succeed
    - **Updated the start script**: Changed from node dist/main.js to node dist/src/main.js to match the new file structure
  - This approach keeps the expected directory structure for file operations while accommodating the new TypeScript configuration needed for testing.
- Added more tests on the vendors module.
  - added a readme for other engineers
  - used constants for error responses so we can assert against them in tests
  - added aaa pattern comments

**August 22**

- Implemented file system service.
  - **Problem**: I changed tsconfig.json rootDir from "src" to "." to support tests, but it completely broke our app's file system paths. Email sending failed, static files became inaccessible, PDF generation crashed - basically anything using __dirname or hardcoded relative paths stopped working because the compiled output structure changed.
  - **Root Cause**:
    - Our codebase had scattered **dirname usage and hardcoded paths like path.join(**dirname, "../../../files/template.pug")
    - These paths worked in dev but broke in production builds
    - No centralized way to handle assets/templates/temp files
    - before, the output folder would look like this:
```
    dist/
    ├── app.js
    ├── main.js
    └── utils/
```
    - now it looks like this:
```
    dist/
    ├── src/
    │ ├── app.js
    │ ├── main.js
    │ └── utils/
    └── tests/
```

- **Solution**: Created a centralized FileSystemService with environment-aware path resolution.
- **Result**: Development and production now use identical path resolution logic. The file system is accessed using the same interface.

```ts
// Before:
path.join(__dirname, '../../../assets/fonts/Inter-Regular.ttf');

// After:
getFontPath('Inter/Inter-Regular.ttf');

// Before:
fs.readFileSync(path.join(__dirname, '../../templates/email.pug'));

// After:
readTemplateFile('welcome', 'email');
```

- Updated report & payment link endpoints to use the file system service.
- Ran the linter on the main branch to make all safe fixes (after discussing with Ajibade if this was a good idea or not). Then made a PR to beta.

**August 25**

- Updated target and module in tsconfig to ES2022 & fixed build errors.
- Removed nanoid package & replaced with custom function for generating URL safe strings.
  - Why? We use commonjs modules, nanoid is ESM only. This is a pain in the ass to resolve, so I wrote my own function to do the same thing nanoid did. I removed the mocks and verified that yarn build and yarn run work.

**August 26**

- Oladipo had returned here. So I returned to my day to day of feature work, less code reviews and less big-picture work.
- Fixed a bug deleting all store categories after importing products
  - Problem: All imported categories are assigned path: '/' and parent: '/'. In the DELETE category endpoint, it attempts to prevent orphaned records by deleting categories whose parent matches the path of the category being deleted. Since all imported categories have '/' as parent and path - they are deleted.
  - Solution:
    - Updated the import logic to use the slugified title of a new category as its path.
    - Add the isImported field to the category schema to better track imported vs manually created categories.
    - I wrote and ran a migration to find existing imported categories that have path & parent as / and set a correct path. This also sets the isImported field to true.
    - I ran a second migration to set isImported to false for default categories.

**August 29**

- improved build/transpilation speed & trimmed dependencies
  - I set up a debugger that can be started by hitting 'F5' or the equivalent on Mac. This debugger includes a build step to make sure the code being debugged is up to date. This build step takes anywhere from 20s to 1m30s.
  - In a day, this adds up to countless hours wasted waiting for a build to finish. The same applies to tests. Tests must first transpile using ts-jest, before they run.
  - I added swc, new build commands using it & updated the dev script to utilise it with nodemon.
  - The build time is now \< 2s - usually almost instant. I also removed all unused dependencies from the package.json.
- Update import & export customer endpoints
  - updated both endpoints to accept & return matching data structures such that users can now export customers & import the same file with no issues.
  - added an index on the customer model to prevent multiple customers with the same full name within a store & location.
  - when a duplicate customer is found during import, the email and phone are updated - if they have a new & truthy value.

### September

**September 1**

- Fixed attribute handling & transform error in product model
  - Problem: Some endpoints trigger the toJSON method on the product model. In the Product model, variation attributes are defined as Maps:

```ts
	attributes: {
    	type: Map,
     	of: String,
    }
```

    However, the data is stored and fetched from the database as plain objects, not Map instances. The existing toJSON transform assumed attributes would always be Maps and called Object.fromEntries() directly. This caused Object.fromEntries() to fail with "object is not iterable" when passed a plain object instead of a Map.

- Solution: Added a type check to handle both Maps and plain objects:

  ```ts
  attributes: variation.attributes instanceof Map
  	? Object.fromEntries(variation.attributes)
  	: variation.attributes || {};
  ```

- Added a workflow to run all tests in the project
- Resolved a circular dependency between files causing tests to fail. I used the package, madge, to find these dependencies.

**September 2**

- replaced the JSON schema in the store module with zod schema.
  - checked each endpoint in store.route.ts to see what the current schema was, compared to the data expected by the endpoint. I then created a zod schema based on the existing schema - so as to maintain the same validation logic - and used the new zod schema in the route.
  - the behaviour of the endpoint does not change, but the validation now uses zod.
- moved code out of handler files into the store controller for consistency with the patterns established in the codebase.
- Removed unnecessary location header validation from get single store and get all store endpoints. Also fixed a problem with query validation on the get all stores schema.

**September 3**

- Refactored the vendor module using zod & typegoose
  - replaced the old vendor model with an equivalent typegoose model
  - added Fastify zod type provider & replaced all JSON schema used in vendor.model.
  - validated the changes by running all tests I had written for the vendor module.
  - The aim is to eventually switch to using typegoose over mongoose & zod over JSON schema.
  - I had already discussed making this change with Ajibade and Oladipo. Using mongoose had led to significant drift between our db schema and types and a lot of type errors.
- Fixed collection name & model reference issues on Vendor collection per this Github discussion: [https://github.com/typegoose/typegoose/discussions/1007](https://github.com/typegoose/typegoose/discussions/1007). Also made location nullable on the vendor model, per business requirements.
- Fixed validation error when vendor.website is sent as an empty string.
- Updated error message on vendor.website to include an example of a valid URL.

**September 4**

- Added a test suite for store payment methods
- Downgraded and pinned versions for typegoose and mongoose after a teammate accidentally updated both packages - causing build errors.
  - Added documentation on _why_ we use those versions - it’s for compatibility.
- Added documentation for `swc` specifying that it only transpiles and does not typecheck, so that teammates remember to actually run a typecheck locally - since the team lead does not respect the build workflow that does the typecheck.
- Updated the error messages returned by import products validation so they tell users how to fix the errors raised.

**September 5**

- add integration tests for product imports

**September 8**

- Support location-based pricing in import/export products using a new `useLocationPricing` column

**September 9**

- Per CEO request, I updated the import products endpoint to directly replace the inventory of a product with the CSV input instead of increasing it.
- Fixed a bug causing imei’s to get duplicated when updating serialised products (in a very specific situation). Added a test to prevent a regression.

**September 10**

- Added documentation on zod, request validation & routing.
  - In most of the codebase, we use Json Schema for validation. Fastify uses this schema to infer the types of the request and response objects, and the methods passed to a route are validated against the expected type signature. However, JSON Schema is limited. We can't perform complex validation and we can't add error messages for all scenarios, only some scenarios.
  - With Zod, we can do both: perform complex validation and provide detailed error messages for all scenarios. But this comes at a cost - refactoring the existing code to use Zod instead of JSON Schema. This document goes into the details of how to make this transition smoothly.
- Serve the import products template as a static file rather than using a file uploaded to AWS
  - why? well, the team can’t access the AWS account to create an account for me to fix the S3 CORS errors. This is an alternative.
- Disabled the import products feature on production because of bugs.

**September 11**

- reworked import products using location based pricing. I had to sit down and rethink the logic for different scenarios + write new tests to validate each branch.
- Updated types used in vendor module tests to reflect what users would send to the endpoint.

**September 12**

- enabled import products on production.

**September 13 - 22**

I was on leave. I needed the rest.

**September 23**

- Setup Monoscope, formerly known as Apitoolkit. We’ve been looking to setup observability in our application, and this is a nice starting point. I had to reach out to their team on Discord, as I noticed a few bugs with events not being tracked correctly.
- Updated our integration test setup to support parallelism.
  - By default, jest runs tests in parallel, but we didn’t have our tests configured to support this, so they ran sequentially.
  - I updated the setup so we created a separate database for each worker, allowing their tests to run without affecting tests run by other workers.

**September 24 - 25**

- The product team sent a new feature request - endpoints to save favourite products & view most-sold products. I spent the first day discussing the requirements and created a workflow documenting the flow and implementation.
- I raised a PR adding three endpoints: create, get and remove favourite products - simple CRUD stuff - plus integration tests.
- I updated the monoscope setup so that events wouldn’t be sent when the application is running locally.

**September 26**

- Added an endpoint to view most-sold products in a store over the last 30 days. The endpoint aggregates and caches the results for 12 hours. Tests included of course.

**September 29 - 30**

- Fixed a bug in the edit payments feature where it would randomly crash. The problem was a missing `location` variable, causing Typescript to infer the type as the browser `Location` module - which doesn’t exist server side.
- Updated the import product logic so that `minimumPrice` is set to 0 when creating new products, and left untouched when updating existing products. Updated all tests to assert this behaviour.
- Updated the get orders endpoint to allow users search orders using the full number (prefix + order number, e.g. BD-340).

### October

**October 1 - 6**

- The product team raised a new feature - Fiscal Receipts. This is only available to users in the Dominican Republic, and uses an API known as Alanube - whose documentation is written in Spanish. I spent most of this time refining requirements, reading documentation, speaking with Alex and informing the UI design as the feature is quite complicated, in that it touches many surfaces.
  - external API integration
  - new subscription plans that integrate with our existing subscriptions but come with allowances
  - tax laws & profiles

**October 7**

- Raised the first two PRs for the Fiscal Receipts feature
  - added new database models & updated existing models.
  - added the skeleton for the Provider interface. I’ll be using the strategy pattern so future devs can easily add/remove providers

**October 8 - 9**

- Raised PR #3 - adding company onboarding endpoints. Users can now setup their accounts prior to issuing fiscal receipts.

**October 10**

- Made a PR fixing a typo in new fields added by Dipu. This was a small but necessary change.
- Updated the export products feature so ‘inactive’ products are not exported.

**October 13**

- Removed the requirement for `measurement` fields in product import and exports.
  - Dipu added the new field and made it required despite the property being nullable. At the moment, imports don't work with the sample file because of this requirement. I also removed measurementType and unit from the main implementation & tests because we have no reason to support them - yet.
- Fixed an issue on the ‘add favourites product’ endpoint preventing users adding multiple variations of the same product. The problem was a misspelled index :/
- Added an endpoint to get the available fiscal receipt plans
  - I created the products on Stripe, then added them to the Fiscal Receipts model in the database.

**October 14 - 17**

- I implemented subscriptions for Fiscal Receipts. This required a lot of iteration with Alex to find a solution that worked for us and customers. We still need to review the credit expiration so it isn’t unfair to users.
  - **how it works**
    - users subscribe to one add-on plan at a time (starter, pro, etc) as a recurring monthly charge on top of their base subscription
    - this gives them a monthly credit allowance that resets at the start of each billing cycle
    - if they want to switch plans, the change takes effect next cycle (no mid-cycle subscription changes)
  - **buying extra credits mid-cycle**
    - if users run out of credits before the month ends, they can purchase more immediately using a one-time charge
    - they pick from the same plan options (starter, pro, etc) and we charge them as a one-time invoice, NOT a subscription change
    - so if they're on the $100/month plan and need more credits now, they just buy another $100 worth instantly
  - **credit expiration**
    - hard reset at the start of each billing cycle
    - when their subscription renews, credits reset to their base plan allowance
    - any unused credits from purchases or the previous month are lost
    - keeps t he accounting simple and predictable
  - **switching plans**
    - users can switch between add-on tiers anytime, but it only takes effect at the next renewal
    - no weird proration credits or mid-cycle changes
    - they keep their current plan and allowance until the cycle ends
    - this way we avoid all the proration issues with stripe treating changes as replacements, and users have a clear way to top up when needed
  - Added four endpoints:
    - POST /fiscals/subscriptions -subscribe to a fiscal receipt plan
    - GET /fiscals/subscriptions - get the active fiscal receipt plan
    - PUT /fiscals/subscriptions - switch fiscal receipt plan. the new plan is activated in the next cycle.
    - POST /fiscals/topup: top up fiscal allowance midcycle.
  - Updated the webhooks to process payments for fiscal receipts
- Setup a commit linter to ensure devs use conventional commits. Also added a pre-commit check to make sure console.logs() aren’t included in commits

**October 20 - 21**

- Working with Sammie to finish Fiscal Receipts. I updated validation so we make checks that don’t require a DB call early. I also update the get subscription endpoint so it returns the subscription status plus the existing allowance - if any. This helps Sam implement the subscription modal on the FE.
- Update the subscribe & topup endpoints so they return unpaid invoices before a user can generate new ones.
- Added the company model to the store response so the FE can infer what state of onboarding the user is on.
- Handled unpaid invoices & prevented double charges when switching plans.
  - When subscribing: if an unpaid subscription invoice exists for a different plan, the old invoice is voided and the old Stripe subscription item removed before adding the new subscription item (prevents double billing).
  - When top-up: if an unpaid subscription invoice exists, the endpoint will return that invoice (won't void it). Only unpaid top-up invoices may be voided (and only when they are for a different top-up plan).

**October 23**

- Simplified the subscription, and topup flow by switching to checkout sessions. The top up and subscribe endpoints now accept orderId so we can redirect the users to the dashboard when the checkout flow completes.
  - Subscription: When checkout is completed, the subscription item is added to the user’s existing subscription. We calculate the prorated charge ourselves when creating the checkout session.
  - Topup: We calculate the prorated charge ourselves when creating the checkout session. On completion, we top up the user’s allowance.
  - Subscription End: When we receive a customer.subscription.deleted event, we unset cancel the subscription in the system & clear their allowance

**October 24**

- Implemented foundation for fiscal receipts issuance. I realised the ENCF sequence issued by the government is non-contiguous, meaning when our current sequence expires, it’s not certain that the next sequence will start where the previous one ended. I designed a service to allow us to easily transition between active sequences without any pain.
  - For each receipt we issue, we are to generate a valid encf. Each receipt consumes one number from the sequence.
- Implemented the endpoint for issuing a fiscal receipt for an order. This validates the orders tax details, the users fiscal allowance, maps the data to the alanube payload & sends an API request. If successful, the user's allowance is deducted & we save the fiscal receipt to db.

**October 27 - 29**

- Fixed some validation errors reported by Sammie.
  - Check that orders have at least one product
  - Only use cash payment type
  - Exclude phone number from sender info, otherwise we might get number format errors
- Added a webhook handler for events from Alanube. Their documentation is quite vague tbh, so I only added handling for the `documents.emissionFinished` event. The handler adds the documents to the order, updates the order timeline & sets the final status for the Fiscal Receipt.
- Added Monoscope to beta and prod. Unfortunately, the API keys don’t work as expected. Anthony (Alaribe) is on it
- Added a cron job to requery fiscal receipts that are in a non terminal status and complete them.
- Included fiscal receipts when fetching an order so the FE can use them in the modal.

**October 30**

- Updated fiscal receipt logic to immediately add it to the order when created. This way the FE can display a `Processing` status to users. The previous logic would only link the fiscal receipts when they reached a terminal status.
- Alanube supports `main` and `associated` companies. The main company in this scenario is LunixPos, and associated companies are our customers issuing Fiscal Receipts. I assumed that events for associated companies would be sent to the main company’s webhook URL, but Alanube said this is not the case. As such, I updated the create company logic to set the webhook URL when creating associated companies.
- Fixed some issues with tax calculation. I wasn’t calculating the values correctly in some cases, and assigned the wrong billing indicator in other scenarios.

**October 31**

- Added code to handle renewal of fiscal receipts in new billing cycles.
  - When we receive an invoice.payment.succeeded event with reason billing_cycle, the subscription has rolled into a new period.
  - We check the user's active fiscal receipt plan and renew it accordingly. This handles mid-cycle plan switches, since the invoice payment reflects the new plan.
  - If the subscription lacks a fiscal receipt plan, we unset subscription.fiscalReceipts to deactivate it. Otherwise, we reset their allowance for the new cycle.

### November

**November 3 - 4**

- Added a job to fetch fiscal receipt documents for receipts in a terminal state. I learned Alanube doesn't reliably include the PDF in the webhooks they send. So this job runs every 30 minutes, and will try up to 3 times before giving up.
- Added endpoints to cancel and reactivate a fiscal receipt subscription. Users can now cancel their fiscal receipt subscriptions at the end of their billing period while retaining access until then, and can reactivate before the period ends.
- Trying to encapsulate logic within the provider. I added a `processWebhook` to `IFiscalReceiptProvider` to handle this, and `isWebhookValid` to verify the signature.
- Added some functions for code I kept repeating, so it’s easier to manage.

**November 5**

- Updated the create company endpoint to create three tax profiles when a user onboards to use fiscal receipts. The tax profiles cover the expected tax brackets: ITBIS 1 (18%), ITBIS 2 (16%), and Exempt (0%).

**November 6 - 7**

- Added tests for fiscal receipts & stripe webhooks

**November 12 - 14**

- Refactored the validation on product imports to use the strategy pattern. Validation for each type of product is enclosed within strategy.
- I spent a few days debugging an issue with our integration tests. Some tests would fail - seemingly randomly - when running the test suite. I eventually pinpointed the issue - a bad mock of agenda. The agenda module was trying to connect to the db using the env variable from the .env.test file. I fixed the mock and tests started to pass again.
- Replaced the `request-ip` library with custom functions for getting the IP address from a request.

**November 17**

- Added support for `stockType` in product imports. The team added a new feature allowing users to stock their product in different ways. CEO asked that we support importing products using these stock types, hence this entry.
- Updated the integration test setup so containers aren’t started before unit tests run. This was an oversight tbh.

**November 18**

- Added support for importing **simple** products with all three stock types.
- Made a small optimisation to the `afterEach` block in our integration tests. Rather than deleting each collection, the code simply drops the database after each test.

**November 19**

- Standardised the enums used to refer to each stock type so that the FE, Product and BE are in sync.
- Fixed a case when importing `unit+weight` products. The CEO had miscommunicated a requirement.

**November 20**

- Added support for importing **variable** products with all three stock types.
  - Note: serialized products don’t use these new stock types.
- Added support for `tags` in product imports. The field accepts comma separated strings. Each string is added to the product as a tag.

**November 21**

- Added code to prevent duplicate product slugs during product imports.
  - When importing products, users provide a `handle`. This is used to identify a product group. It is stored on the product model. Before this change, when a user imported products, they could reuse a handle that already existed in DB for a different product - and there would be no error.
  - There’s no unique constraint on this field because there are products with the same handle in DB. I will resolve this soon.
- Fixed a floating precision error that occurred when importing products whose `stockType` is `unit+weight`, and include decimal values for `weightPerUnit`. The field determines how much a unit of a product weighs, and is multiplied by the number of units of a product to get the `totalWeight`.
  - I rounded the value to 2 d.p after calculation.

### December

**December 12**

- I was assigned a task to optimise some endpoints
  - Gave a teammate some feedback to push some work into the background, instead of holding up the request waiting for unrelated code to execute.
    - Also gave him some advice on how to make the background job idempotent.
  - I checked the region our services were deployed in. I noticed our backend lives on us-west-2, while the db is on us-east-1. I moved the db servers to us-west-2 to match.
    - In a week, I’ll check the metrics to compare the response times. So far, there’s a noticeable improvement.

**December 18**

- Results of the database region migration

![][image1]

- **Median** (p50): 250ms → less than 20ms (~92% faster)
- **p75**: 400ms → 40-50ms (~88% faster)
- **p90**: 600-700ms → 130-150ms (~80% faster)
- **p99**: mostly below 1s now (was regularly exceeding 1s)
- My next task is to optimize the cart feature. I plan to rebuild it and change the way it works. Currently, only a subset of data in the cart is actually persisted to the database. Each time the cart is fetched, a `cartModifier` function is called which populates the cart, runs calculations, and presents an up to date representation of the cart.
  - But first, I wrote a test suite covering all endpoints that modify the cart & the output of `cartModifier`.
- Made a fix to the edit payment endpoint, allowing users to enable tax on an order.

**December 22**

- After a few days of tussling with the cart endpoints, I realised a refactor was simply impossible. Instead, I chose to optimize `cartModifier`. I found a few N+1 queries that occurred when populating products and tax profiles.
  - I fixed the queries by fetching all products at the start of the method, and finding the tax profiles that were attached to the products, then storing both pieces of data in a map for quick access later in the method.

## 2026

### January

**January 6 & 7**

- Added an endpoint to save favourite products in bulk. It accepts a list of objects, each containing a productId and optionally, a variationId
- Fixed a bug where if duplicates of an object were sent, the BE would attempt to save them all at once, instead of deduplicating the input.

### February

**February 2**

- I raised a PR to beta and noticed that CI lint & type check failed due to an OOM error, but only on beta. I started to read through the typescript [performance](https://github.com/microsoft/Typescript/wiki/Performance#using-project-references) & [performance tracing](https://github.com/microsoft/TypeScript/wiki/Performance-Tracing) guides and decided to split the tsconfig into two: one for our main project, and another for tests. This resolved the OOM error locally, but it still failed on Github Actions.  
  My main tsconfig looked like this:

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.build.json" },
    { "path": "./tsconfig.test.json" }
  ],
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "lib": [
      "ES2022",
      "DOM"
    ],
    "rootDir": ".",
    "types": [
      "node",
      "jest"
    ],
    "typeRoots": [
      "./node_modules/@types",
      "../node_modules/@types",
      "../../node_modules/@types",
      "./src/declarations"
    ],
    "sourceMap": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "strict": true,
    "skipLibCheck": true,
    "composite": true,
    "declaration": true
  },
  "ts-node": {
    "swc": true
  }
```

- After reading some more, I updated this config, removing `composite`, `declaration` and the 2nd and 3rd entries under `typeRoots`. I figured that composite + declaration caused the compiler to attempt generating a large dependency graph causing it to into all available memory, then crash. This change fixed the OOM error and made our builds complete twice as fast. Not bad.

**February 3 & 4**

- Worked on a new Feature: An endpoint to allow users manage their store payment methods in bulk. In one modal, users can add new payment methods, and edit or delete existing methods.