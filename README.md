# Project_DS
Distributed Systems course project. Innopolis University, 2019

- #### Team members:
    - [Alexey Logachev](https://github.com/Picroc)
    - [Eugene Bondarev](https://github.com/laser4622)
    - [Liliya Gabdrahimova](https://github.com/liarmand)

- #### To use the system
    Go to [dfs_servers submodule](https://github.com/Picroc/flask-dfs-service/tree/fd6e8baaa7d988c5ecea5de5a98311814580c04a) README.
    

- #### System Architecture Diagram
   ![](https://i.imgur.com/n6zDO9q.png)



- #### Protocols
    We decided to devide the system into two parts: frontend (front side) for the client and backend.
    
    Connection implemented using Rest API.
    End points are:
    - GET /Init (Initialize function)
    - GET /Get dirs (Read directory)
    - POST /Create dir (Make directory)
    - DELETE /Delete dir (Delete directory)
    - POST /Create file (Create file)
    - GET /Get file info (File info)
    - DELETE /Delete file (File delete)
    - POST /Write to file (File write)
    - GET /Read from file (File read)
    - GET /Move (File move and file copy with parameter copy)
    Open directory function is based only on frontend part.
   
