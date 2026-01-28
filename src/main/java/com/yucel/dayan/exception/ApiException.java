// Bu sınıfın bulunduğu paket.
// exception paketinde tutmamızın sebebi:
// -> Bu sınıfın bir "hata (exception)" temsil etmesi
package com.yucel.dayan.exception;

/*
  ApiException:
  - Bu sınıf bizim KENDİ tanımladığımız özel exception'dır.
  - RuntimeException'dan türediği için:
      * try-catch zorunluluğu yok
      * Spring otomatik olarak yakalayabilir
  - "Gerçek sistem hataları" (NullPointer, DB down vs.) için değil,
    "iş kuralı hataları" için kullanılır.

  Örnek kullanım senaryoları:
  - Kullanıcı bulunamadı → 404
  - Email zaten kayıtlı → 409
  - Yetkisiz işlem → 403
  - Hatalı istek → 400
*/
public class ApiException extends RuntimeException {

    /*
      status:
      - Bu exception fırlatıldığında frontend'e dönecek HTTP status kodu.
      - Normal Exception'larda böyle bir bilgi yoktur.
      - Biz burada hatayı HTTP ile ilişkilendiriyoruz.

      Örnek:
      - 400 → Bad Request
      - 404 → Not Found
      - 409 → Conflict
    */
    private final int status;

    /*
      Constructor:
      - ApiException oluşturulduğunda çalışır.
      - status → HTTP status kodu
      - message → hatanın açıklaması (frontend'e gidecek mesaj)

      super(message):
      - RuntimeException'ın constructor'ına mesajı gönderir.
      - Bu sayede getMessage() çağrıldığında bu mesaj alınır.
    */
    public ApiException(int status, String message) {
        super(message);     // Exception'ın kendi message alanını doldurur
        this.status = status; // HTTP status kodunu saklarız
    }

    /*
      Getter:
      - status alanını dışarıdan okuyabilmek için.
      - @ControllerAdvice içinde bu metot çağrılır.
      - Spring, response üretirken bu değeri kullanır.
    */
    public int getStatus() {
        return status;
    }
}
