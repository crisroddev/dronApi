What instrumentation this service would need to ensure its observability and operational
transparency?

The server process could run with logging by default, storing logs in a file without need to manually specify this functionality. Furthermore, while running the process the server. We can log each each use the server API, logging the request and status code. Using these metrics we can determine the health of the server. Furthermore, adding a health check API can be used to quickly determine the health of the server (e.g. can it return a 200 OK status code).

In general, how would you separate technical decision to deploy something from business
decision to release something?

Separate the need to test, from the need to release to the users. The technical decision to deploy can be used to provide evidence that the project is working as expected, and that it has all of the desired properties after being deployed (not just during development). The business decision to release something relies on having good information about how it will perform once deployed, therefore it must be deployed in a testing environment before it can be fully released.
