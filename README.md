# Project_DS
Distributed Systems course project. Innopolis University, 2019

- #### Team members:
    - [Alexey Logachev](https://github.com/Picroc)
    - [Eugene Bondarev](https://github.com/laser4622)
    - [Liliya Gabdrahimova](https://github.com/liarmand)

- #### To use the system
    Go to [dfs_servers submodule](https://github.com/Picroc/flask-dfs-service/tree/fd6e8baaa7d988c5ecea5de5a98311814580c04a) README.
    

- #### System Architecture Diagram
    ![](https://i.imgur.com/Tvav0O8.png)

- #### Protocols
    We decided to devide the system into two parts: frontend (front side) for the client and backend.
    
    Connection between the frontend and naming servers is implemented using Rest API. 
    End points of Naming server are:
    - Init (Initialize function)
    - Get dirs (Read directory)
    - Create dir (Make directory)
    - Delete dir (Delete directory)
    - Create file (Create file)
    - Get file info (File info)
    - Delete file (File delete)
    - Write to file (File write)
    - Read from file (File read)
    - Move (File move)
    Open directory function is based only on frontend part.
    
    Connection between the Naming server and Storage servers is implemented using Rest API and overlay network.
    End points of Storage server are:
