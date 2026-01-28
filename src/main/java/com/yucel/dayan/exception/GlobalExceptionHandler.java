// src/main/java/com/yucel/dayan/exception/GlobalExceptionHandler.java
package com.yucel.dayan.exception;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/*
  @RestControllerAdvice:
  - Tüm controller’larda oluşan hataları burada yakalarız.
  Niye önemli?
  - Backend’in her hata durumunda "tek tip JSON" döner.
  - Frontend hataları tek yerden işler.
*/
@RestControllerAdvice
public class GlobalExceptionHandler {

    /*
      1) Bizim ApiException’larımız:
      - status kodunu exception içinde taşıyoruz.
    */
    @ExceptionHandler(ApiException.class)
    public ResponseEntity<?> handleApiException(ApiException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("success", false);
        body.put("message", ex.getMessage());
        body.put("time", LocalDateTime.now());

        return ResponseEntity.status(ex.getStatus()).body(body);
    }

    /*
      2) @Valid ile gelen DTO validasyon hataları:
      - Örn: title boş, email formatı yanlış vs.
      - MethodArgumentNotValidException içinde field hataları var.
    */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("success", false);
        body.put("message", "Validation error");
        body.put("time", LocalDateTime.now());

        Map<String, String> fieldErrors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(err ->
                fieldErrors.put(err.getField(), err.getDefaultMessage())
        );
        body.put("errors", fieldErrors);

        return ResponseEntity.badRequest().body(body);
    }

    /*
      3) Bazı validasyonlar parametre/constraint üzerinden gelir:
      - Örn: @RequestParam @Min gibi şeyler
    */
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<?> handleConstraint(ConstraintViolationException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("success", false);
        body.put("message", "Constraint violation");
        body.put("time", LocalDateTime.now());
        body.put("details", ex.getMessage());

        return ResponseEntity.badRequest().body(body);
    }

    /*
      4) Fallback (beklenmeyen hata):
      - Prod’da stacktrace göstermeyiz, logları ayrı tutarız.
    */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleAny(Exception ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("success", false);
        body.put("message", "Unexpected server error");
        body.put("time", LocalDateTime.now());

        return ResponseEntity.internalServerError().body(body);
    }
}
