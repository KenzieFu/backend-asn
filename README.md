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
