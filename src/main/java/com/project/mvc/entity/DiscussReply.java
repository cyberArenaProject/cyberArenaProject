package com.project.mvc.entity;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DiscussReply {

    private long discussionReplyNo;
    private long discussionNo;
    private String email;
    private String discussionReplyContent;
    @Setter
    private LocalDateTime discussionReplyCreatedAt;


}
