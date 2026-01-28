package com.yucel.dayan.service;

import com.yucel.dayan.dto.about.AboutResponse;
import com.yucel.dayan.dto.about.UpdateAboutRequest;

public interface AboutService {
    AboutResponse get();
    AboutResponse update(UpdateAboutRequest req);
}
