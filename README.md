## API Documentation

### Endpoint

`localhost:8080/`

## AUTH
### Login
User melakukan login
- **URL:** `/login`
- **Method:** POST
- **Request Body(JSON):**
    - `email` as `string`, must be unique
    - `password` as `string`,
- **Response:**
    ```json
    {
      "data":token
    }
    ```


### Logout

- **URL:** `/login`
- **Method:** POST
- **Response:**
    ```json
    {
      "message":"Logout Berhasil"
    }
    ```

## ACCOUNT
### ALL Accounts
Mengambil semua daftar user
- **URL:** `/accounts`
- **Method:** GET
- **Response:**
  
![image](https://github.com/KenzieFu/backend-asn/assets/95515953/aa55f219-1e1d-4e7c-992b-71e7817d83a2)

### Get one account
Mengambil salah satu user
- **URL:** `/accounts/:account_id`
- **Method:** GET
- **Response:**

![image](https://github.com/KenzieFu/backend-asn/assets/95515953/8083889f-beba-48ca-a045-236603e7b87a)

### Create Account 
menambahkan user
- **URL:** `/accounts`
- **Method:** POST
- **Request Body:**
```
{
    "email":"andi@gmail.com",
    "password":"12345678",
    "name":"andi"
}
```
- **Response:**
```
{
    "message": "Berhasil Membuat Akun Baru"
}
```

### Delete Account
menghapus user
- **URL:** `/accounts/:account_id`
- **Method:** DELETE
- **Response:**
```
{
    "message": "Berhasil Menghapus Akun"
}
```

### Update Account
menghapus user
- **URL:** `/accounts/:account_id`
- **Method:** PUT
- **Response:**
```
{
    "message": "Berhasil Mengubah Akun"
}
```

## Category
### Get ALL Category 
Mengambil semua kategori
- **URL:** `/categories`
- **Method:** GET
- **Response:**
```
{
    "data": [
        {
            "category_id": "1",
            "category_alias": "TIU",
            "category_name": "Tes Intelegensi Umum"
        },
        {
            "category_id": "2",
            "category_alias": "TWK",
            "category_name": "Test Wawasan Kebangsaan"
        },
        {
            "category_id": "3",
            "category_alias": "TKP",
            "category_name": "Tes Karakteristik Pribadi"
        }
    ]
}
```

### Get category
mengambil satu kategori
- **URL:** `/categories/:category_id`
- **Method:** GET
- **Response:**

```
{
    "data": {
        "category_id": "1",
        "category_alias": "TIU",
        "category_name": "Tes Intelegensi Umum"
    }
}
```

### Create category
Menambah Kategori
- **URL:** `/categories`
- **Method:** POST
- **Request Body:**
```
{
    "category_name":"Tes kemampuan ada",
    "category_alias":"TKA",
}
```
- **Response:**

```
{
   message:"Berhasil menambahkan kategori"
}
```
### Update category
Mengubah Kategori
- **URL:** `/categories/:category_id`
- **Method:** PUT
- **Request Body:**
```
{
    "category_name":"Tes kemampuan ada",
    "category_alias":"TKA",
}
```
- **Response:**

```
{
   message:"Berhasil mengubah kategori"
}
```

### Delete category
Menghapus Kategori
- **URL:** `/categories/:category_id`
- **Method:** DELETE
- **Response:**

```
{
   message:"Berhasil menghapus kategori"
}
```

## SubCategory
### Get ALL SubCategory 
Mengambil semua sub kategori
- **URL:** `/subCategories`
- **Method:** GET
- **Response:**
```
{
    
    "data": [
        {
            "subCategory_id": "1",
            "category_id": "1",
            "subCategory_name": "Analogi"
        },
        {
            "subCategory_id": "2",
            "category_id": "1",
            "subCategory_name": "Silogisme"
        },
    ]
}
```

### Get sub category
mengambil satu sub kategori
- **URL:** `/subCategories/:subCategory_id`
- **Method:** GET
- **Response:**

```
{
    "data": {
        "subCategory_id": "1",
        "category_id": "1",
        "subCategory_name": "Analogi"
    }
}
```

### Create sub category
Menambah Sub Kategori
- **URL:** `/subCategories`
- **Method:** POST
- **Request Body:**
```
{
    "category_id":"1",
    "subCategory_name":"Mantap",
}
```
- **Response:**

```
{
   message:"Berhasil menambahkan sub kategori"
}
```
### Update sub category
Mengubah Kategori
- **URL:** `/subCategories/:subCategory_id`
- **Method:** PUT
- **Request Body:**
```
{
    "category_id":"1",
    "subCategory_name":"Mantap",
}
```
- **Response:**

```
{
   message:"Berhasil mengubah sub kategori"
}
```

### Delete sub category
Menghapus sub Kategori
- **URL:** `/categories/:category_id`
- **Method:** DELETE
- **Response:**

```
{
   message:"Berhasil menghapus sebuah Sub Kategori"
}
```

## Course
### Get All Courses based on category
mengambil semua course berdasarkan category
- **URL:** `/courses/account/:account_id/category/:category_id`
- **Method:** GET
- **Response:**

```
{
    "data": [
        {
            "course_id": "1",
            "category_id": "1",
            "course_image": "course/nasionalisme/course_image-2024-05-16T05%32%11.752Z.png",
            "course_queue": 1,
            "course_name": "Nasionalisme",
            "course_description": "",
            "course_file": "course/nasionalisme/course_file-2024-05-16T09:16:49.516Z.txt",
            "createdAt": "2024-05-16 05:32:11.808000+00",
            "updatedAt": "2024-05-16 09:16:49.518000+00",
            "isCleared": "0"
        },
        {
            "course_id": "4",
            "category_id": "1",
            "course_image": "course/belanegara/course_image-2024-05-17T02%53%39.264Z.jpeg",
            "course_queue": 2,
            "course_name": "Bela Negara",
            "course_description": "Memberikan penjelasan lebih mendalam mengenai pentingnya bela negara dalam keberlangsungan suatu negara",
            "course_file": null,
            "createdAt": "2024-05-17 02:53:39.306000+00",
            "updatedAt": "2024-05-17 02:53:39.306000+00",
            "isCleared": "0"
        }
    ]
}
```

### Get One Courses 
mengambil satu course 
- **URL:** `/courses/:course_id/account/:account_id`
- **Method:** GET
- **Response:**
```
{
    "data": {
        "course_id": "1",
        "category_id": "1",
        "course_image": "course/nasionalisme/course_image-2024-05-16T05%32%11.752Z.png",
        "course_queue": 1,
        "course_name": "Nasionalisme",
        "course_description": "",
        "course_file": "course/nasionalisme/course_file-2024-05-16T09:16:49.516Z.txt",
        "createdAt": "2024-05-16 05:32:11.808000+00",
        "updatedAt": "2024-05-16 09:16:49.518000+00",
        "isCleared": "0",
        "content": [
            "Pentingnya Nasionalisme",
            "Nasionalisme adalah sikap atau semangat yang harus dimiliki setiap warga negara Indonesia dalam mencintai tanah airnya. Apa arti dan tujuan nasionalisme?",
            "Secara etimologis, kata nasionalisme berasal dari kata nationalism dan nation dalam bahasa Inggris. Dalam studi semantik kata nation tersebut berasal dari kata Latin yakni natio yang berakar pada kata nascor yang bermakna 'saya lahir', atau dari kata natus sum, yang berarti 'saya dilahirkan'.",
            "Dalam perkembangannya kata nation merujuk pada bangsa atau kelompok manusia yang menjadi penduduk resmi suatu negara dalam mencintai tanah airnya.",
            ""
        ]
    }
}
```


### Create Courses 
Create course 
- **URL:** `/courses`
- **Method:** POST
- **Request Body:**
```
//Gunakan formdata karena mau upload image 
{
    category_id:"1",
    course_name:"Aap",
    course_description:"Haloooo"
    course_image:"pathfile"
}
```
- **Response:**
```
{
 message:"Berhasil Menambahkan Course Baru"
}
```

### Assign Course Content
Memasukan kontent txt sebuah course
- **URL:** `/courses/content/:course_id`
- **Method:** PUT
- **Request Body:**
```
// Gunakan form data
// gak ada yang disend ke body sih karena diambil si multer utk ambe buffer
{
    course_file
}
```
- **Response:**
```
{
    message:"Berhasil memasukan Materi"
}
```
### Update Course Sequence
Mengubah Urutan Course suatu kategori
- **URL:** `/courses/queue/:course_id`
- **Method:** PUT
- **Request Body:**
```

{
    course_queue:"2"
}
```
- **Response:**
```
{
    message:"Berhasil mengubah Urutan Course"
}
```

### Update Course
Update Course suatu kategori
- **URL:** `/courses`
- **Method:** POST
- **Request Body:**
```
//Gunakan formdata karena mau upload image 
{
    category_id:"1",
    course_name:"Aap",
    course_description:"Haloooo"
    course_image:"pathfile"
}
```
- **Response:**
```
{
 message:"Berhasil Mengubah Course"
}
```

