package com.project.mvc.mapper.jihye;

import com.project.mvc.common.jihye.Page;
import com.project.mvc.dto.response.jihye.ReviewFindAllDto;
import com.project.mvc.dto.response.kibeom.ReviewAsideListDto;
import com.project.mvc.dto.seongjin.ReviewAllowDto;
import com.project.mvc.dto.seongjin.ReviewLinkDto;
import com.project.mvc.dto.zyo.ReviewRenderingDto;
import com.project.mvc.entity.Review;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReviewMapper {

    // 선택한 미디어에 리뷰 등록 (email, 별점, 내용, 토론신청 여부)
    boolean save(Review review);

    // 리뷰 수정
    boolean modify(Review review);

    // 리뷰 삭제
    boolean delete(long reviewNo);

    // 특정 미디어에 달린 리뷰 목록 전체조회
    // ReviewFindAllDto
    List<ReviewFindAllDto> findAll(long mediaNo);

    // 특정 미디어에 달린 총 리뷰 수 조회
    int count(long mediaNo);

    // 리뷰 번호로 원본 미디어글 찾기
    long findMno(long rno);

    // 리턴값 수정했음 -seongjin
    List<ReviewLinkDto> findAllByEmail(String email);

    // 기범
    List<ReviewAsideListDto> findAsideList();

    boolean updateMediaRating(long mediaNo);

    boolean updateRatingWhenDeleteLastReview(long mediaNo);

    ReviewAllowDto getAllowDto(long reviewNo);


}

