package com.kwic.kwcommunity.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class homeDTO {

    private String email;
    private String nickname;
    private List<String> storeImage;

    private String token;

}