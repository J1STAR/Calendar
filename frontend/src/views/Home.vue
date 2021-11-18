<template>
  <div class="calender">
    <div class="header">
      <div class="prevBtn" @click="prevMonth"></div>
      <div class="title">
        <span class="calYear"></span><span class="calMonth"></span>
      </div>
      <div class="nextBtn" @click="nextMonth"></div>
    </div>
    <div class="main">
      <div class="week">
        <div class="day">일</div>
        <div class="day">월</div>
        <div class="day">화</div>
        <div class="day">수</div>
        <div class="day">목</div>
        <div class="day">금</div>
        <div class="day">토</div>
      </div>
      <div class="dates"></div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import "../style/main.css";

export default {
  name: "Home",

  setup() {
    var today = new Date();

    onMounted(() => {
      buildCalendar();
    });

    const buildCalendar = () => {
      let prevLast = new Date(today.getFullYear(), today.getMonth(), 0); // 지난달의 마지막 날
      let currentFirst = new Date(today.getFullYear(), today.getMonth(), 1); // 이번달의 첫번째 날
      let currentLast = new Date(today.getFullYear(), today.getMonth() + 1, 0); // 이번달의 마지막 날

      document.querySelector(".calYear").innerHTML = today.getFullYear() + ".";
      document.querySelector(".calMonth").innerHTML = today.getMonth() + 1;

      let dates = []; // 달력에 출력될 날 배열
      if (currentFirst.getDay() != 0) {
        // 만약 이번달의 시작이 일요일이 아니면
        for (let i = 0; i < currentFirst.getDay(); i++) {
          // 지난달의 마지막 날부터 하루씩 빼면서 배열앞에 값을 넣는다
          dates.unshift(prevLast.getDate() - i);
        }
      }
      for (let i = 1; i <= currentLast.getDate(); i++) {
        dates.push(i);
      }

      for (let i = 1; i <= 6 - currentLast.getDay(); i++) {
        dates.push(i);
      }

      console.log(dates);
      let htmlDates = "";
      for (let i = 0; i < dates.length; i++) {
        htmlDates += `<div class="date">${dates[i]}</div>`;
      }

      document.querySelector(".dates").innerHTML = htmlDates;
    };

    const prevMonth = () => {
      // 이전 달 구하기
      today.setMonth(today.getMonth() - 1);
      buildCalendar();
    };

    const nextMonth = () => {
      // 다음 달 구하기
      today.setMonth(today.getMonth() + 1);
      buildCalendar();
    };

    return {
      onMounted,
      prevMonth,
      nextMonth,
    };
  },
};
</script>
