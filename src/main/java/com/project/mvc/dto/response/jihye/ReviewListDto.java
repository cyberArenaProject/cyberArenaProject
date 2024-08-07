package com.project.mvc.dto.response.jihye;

import com.project.mvc.common.jihye.PageMaker;
import com.project.mvc.dto.seongjin.LoginUserInfoDto;
import com.project.mvc.entity.DiscussionStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor @Builder
public class ReviewListDto {

    private long mediaNo;
    // 리뷰 목록 조회를 위해 필요한 데이터만 DTO
    private long reviewNo;
    private String email;
    private String reviewText;
    private double userRating;
    private DiscussionStatus discussionStatus;
    private LocalDateTime reviewCreatedAt;

    // 리뷰 목록 전체 조회에 들어왔을 때 초기 화면에 보여줄
    @Setter
    private int likeCount;  // 총 좋아요 수
    @Setter
    private String userReaction;   // 현재 리액션 상태


    private List<ReviewDetailDto> reviews;

    private PageMaker pageInfo;

    // 로그인한 사용자 정보 가져와 리뷰 조회하기 위해 필요
    @Setter
    private LoginUserInfoDto loginUser;

    public ReviewListDto(ReviewFindAllDto r) {
        this.reviewNo = r.getReviewNo();
        this.email = r.getEmail();
        this.reviewText = r.getReviewText();
        this.userRating = r.getUserRating();
        this.discussionStatus = r.getDiscussionStatus();
        this.reviewCreatedAt = r.getReviewCreatedAt();
    }

}

