// src/main/java/com/yucel/dayan/dto/common/ApiOk.java
package com.yucel.dayan.dto.common;

import java.time.LocalDateTime;

/*
  Bu sınıf "standart başarılı response" formatı için.
  Niye lazım?
  - Frontend (React) her endpointten aynı formatta cevap alırsa
    işin kolaylaşır (status, message, timestamp vs.)
  - Debug ve UI mesaj yönetimi rahatlar.
*/
public class ApiOk<T> {

    private boolean success;      // her zaman true
    private String message;       // "created", "updated" gibi kısa mesaj
    private LocalDateTime time;   // response üretildiği an
    private T data;               // asıl payload

    public ApiOk(boolean success, String message, LocalDateTime time, T data) {
        this.success = success;
        this.message = message;
        this.time = time;
        this.data = data;
    }

    // Frontend için pratik "factory" metodlar:
    public static <T> ApiOk<T> ok(String message, T data) {
        return new ApiOk<>(true, message, LocalDateTime.now(), data);
    }

    public static ApiOk<Void> ok(String message) {
        return new ApiOk<>(true, message, LocalDateTime.now(), null);
    }

    // getter/setter (Lombok kullanmıyoruz ki her şeyi anlayasın)
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public LocalDateTime getTime() { return time; }
    public void setTime(LocalDateTime time) { this.time = time; }

    public T getData() { return data; }
    public void setData(T data) { this.data = data; }
}
