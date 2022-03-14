# Tuenti-One
| HTTP Method | URI path                       | Description                                |      Protected |
| :---         |   :---:                       |          ---:                              |           ---: |
| GET          | /                             | Render Loggin form               |                False     |
| POST          | /                             | Handle Loggin form               |                False     |
| GET          | /resgister               |Render register form                  |      False     |
| POST          | /register               |Handle register form                  |      False     |
| GET          | /home               |Render home page                  |      true     |
| GET          | /home               |Render post form                  |      true     |
| GET          | /home               |Render comment form                 |      true     |
| POST         | /home               |Handle comment form                 |      true     |
| GET      | /*              |Render edit post form              |      true     |
| POST   | /*              |Handle edit post form              |      true     |
| GET          | /profile && /private             |Render profile page                  |      false     |
| POST          | /profile/uploadphoto-form              |Handle form for uploadphoto                  |      true     |
| POST          | /profile/upload-form              |Handle form for publish text                 |      true     |
| GET          | /profile/:username/edit              |Render form profile edit page                 |      true     |
| PUT          | /profile/:username/edit              |Handle form profile edit page                 |      true     |
| GET      | /discover            |Render list of registered people              |      true     |
| PUT         | /discover          |Handle add-new-friend button            |      true     |

