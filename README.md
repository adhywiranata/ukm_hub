# UKM HUB
![UKMHUB](https://github.com/UKM-HUB/ukm_hub/blob/master/ukmhub.png)

UKMHUB web app create a bridge between corporate and UKM (Small & Medium Companies) with the same category in google map view.
Corporate can see the details of UKM and vice versa. Create buy request and sell request to integrate both of them for Indonesia's UKM
better future

# END POINT

## Corporate

| END POINT                                 | METHOD | DESCRIPTION                                             
|-------------------------------------------|--------|--------------------------------------------------
| /auth/register                            | POST   | Add new company email & password with validation
| /auth/login                               | POST   | Company login with JWT Token                     
| /api/company/:id                          | PUT    | Complete company profile                         
| /api/company/:id/buyRequest               | PUT    | create new buy request ( corp only )             
| /api/company/:id/sellRequest              | PUT    | create new sell request ( ukm only )             
| /api/company/:id/:requestId               | PUT    | change status buy request ( corp only )                
| /api/company/:id/:otherId/:requestId/message| PUT  | create new message                     
| /api/company/:id                          | GET    | get detail one company                           
| /api/company/:id/searchByCategory         | GET    | get all company by type           
| /api/company/:id/searchRequest            | GET    | get request  (show buy request for ukm only, and show sell for corporate )                 


## Cooperation

| END POINT                 | METHOD | DESCRIPTION                                             
|---------------------------|--------|-----------------------------------------------
| /api/coop/login           | POST   | login coop to generate jwt                                                            
| /api/coop/verify/:id      | PUT    | update company verify to true                    
| /api/company/             | GET    | get all company list fill verify at front end    
| /api/coop/unverify/:id    | PUT    | Set Status company to unverified                  


# User Stories

## Corporate

1. User (corporate) pertama kali harus melakukan registrasi menggunakan email dan password, setelah itu user akan menerima email berupa konfirmasi registrasi. setelah melakukan konfirmasi maka user dapat melakukan login dan masuk ke halaman update profile . setelah melakukan pengisian kelengkapan yang dibutuhkan maka user akan diarahkan ke halaman utama (dengan asumsi user telah disetujui oleh admin koperasi)

2. corporate yang telah diverifikasi oleh admin koperasi dapat menggunakan fitur pencarian UKM sekitar sesuai kategori yang sama dengan corporate. tampilan pencarian UKM dapat berupa map view dan list view yang membantu corporate untuk melihat detail UKM

3. Corporate dapat melakukan buy request yaitu melakukan permintaan untuk melakukan pembelian yang dapat dilihat oleh UKM disekitarnya , permohonan pembelian ini dapat direspon oleh UKM dengan mengirimkan surat penawaran.

4. Corporate dapat mengirimkan purchase order untuk merespon sell request dari UKM, purchase order ini digunakan untuk melakukan permohonan pembelian ke UKM yang terkait sesuai dengan kategori.

## UKM

1. User (ukm) pertama kali harus melakukan registrasi menggunakan email dan password, setelah itu user akan menerima email berupa konfirmasi registrasi. setelah melakukan konfirmasi maka user dapat melakukan login dan masuk ke halaman update profile . setelah melakukan pengisian kelengkapan yang dibutuhkan maka user akan diarahkan ke halaman utama (dengan asumsi user telah disetujui oleh admin koperasi)

2. UKM yang telah diverifikasi oleh admin koperasi dapat menggunakan fitur pencarian corporate sekitar sesuai kategori yang sama dengan UKM. tampilan pencarian corporate dapat berupa map view dan list view yang membantu UKM untuk melihat detail corporate

3. UKM dapat melakukan sell request yaitu melakukan permintaan untuk melakukan penjualan yang dapat dilihat oleh corporate disekitarnya , permohonan penjualan ini dapat direspon oleh corporate dengan mengirimkan purchase order.

4. UKM dapat mengirimkan surat penawaran untuk merespon buy request dari corporate, surat ini digunakan untuk melakukan penawaran kepada corporate yang terkait sesuai dengan kategori.

## koperasi

1. koperasi dapat melakukan login untuk masuk ke halaman utama dan dapat melihat list company terdaftar (baik corporate maupun UKM) serta detailnya.

2. Melakukan verifikasi company yang telah terdaftar.

3. dapat melakukan monitoring harga agar tidak terjadi fluktuasi harga yang dapat merusak harga pasar.(fitur opsional)
