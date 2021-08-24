# Comunix Task Api

Home assigment challenge to create socket api.

Http Server - Runs on http://localhost:3022

System Design -
https://lucid.app/lucidchart/invitations/accept/inv_2f3b9080-5cf0-4803-9325-c8a592c1b898?viewport_loc=41%2C17%2C2219%2C1032%2C0_0

## Installation
### Docker
In order to run everything all you need to do is run the following commands:

    yarn install
    yarn start

## Usage
### Schemes
#### User Model
| Props | Type | Description
| :--- | :--- | :--- |
| username | string | unique name identifier for user |
| password | string | password for login and authorization |
#### Paylod Model
| Props | Type | Description
| :--- | :--- | :--- |
| message | string | message to pass along to user |
| numberOfRandomUsers? | number | optional in some of the endpoints. indicated the number of random users that will recive the message. |

### APIs
#### User Api
| PATH | METHOD | DESCRIPTION | PAYLOAD 
| :--- | :--- | :--- | :--- |
| `http://localhost:3022/api/user/login` | `POST` | Get authorization token | the body is in the scheme of `User Model` |
| `http://localhost:3022/api/user/register` | `POST` | Create a user in the system | the body is in the scheme of `User Model` |

#### Socket Api
| PATH | METHOD | DESCRIPTION | PAYLOAD 
| :--- | :--- | :--- | :--- |
| `http://localhost:3022/api/socket/spin` | `POST` | Send a message to random user | the body is in the scheme of `Payload`. numberOfRandomUsers is not required. |
| `http://localhost:3022/api/socket/wild` | `POST` | Send a message to X random users | the body is in the scheme of `Payload`. numberOfRandomUsers is required to detrime the X. |
| `http://localhost:3022/api/socket/blast` | `POST` | Send a message to all users | the body is in the scheme of `Payload`. numberOfRandomUsers is not required. |

### Postman
There's a postman collectioni created for this project that contains both User and Socket apis.
https://www.getpostman.com/collections/4d464a0f2837e66feb6f


## How to use application?
In order to use the application, you need to do the following steps:

1. Register a user. Use Register endpoint to create your user.

2. Login to get token. Use Login endpoint, put your credentials in the body and send to get the token.
Once you got the token as a response, you need to put it in the Authrorization header of Socket endpoints.

3. Go to each of the Socket endpoints (spin, wild and blast), go to Headers tab and replace the existing Authrorization string with the token you got in step 2.

4. Now you can use spin, wild and blast endpoints to send message to your users, enjoy :)


## Notes
1. I hacked around a little in the docker-compose.yml to create a situation of 2 web-socket servers and 6 web sockets client, 3 to each server. Usually this can be obtains in some kind of elastic container technology, but i'm running in localhost.
2. I Duplicated some of the code: redis client and some interfaces, usually i would do some kind of shared folder or move it to a package, but it was too much of an overkill to do it, so i just duplicated the code for now.