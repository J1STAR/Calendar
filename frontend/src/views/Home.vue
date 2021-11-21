<template>
  <div class="calender">
    <div class="top">
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
    <Modal v-if="showModal" :modalData="modalData" @close="closeModal"></Modal>
  </div>
</template>

<script>
import axios from "../lib/axios";
import { ref, onMounted } from "vue";
import "../style/main.css";
import Modal from "./components/Modal.vue";

export default {
  name: "Home",
  components: {
    Modal,
  },

  setup() {
    var showModal = ref(false);
    var modalData = ref(null);
    var today = new Date();
    var dataset = null;

    onMounted(() => {
      // 데이터셋 받아오기
      const getDataset = async () => {
        dataset = await axios.get(
          "https://frontend-assignments.s3.ap-northeast-2.amazonaws.com/job_postings.json"
        );

        // 달력 만들기
        buildCalendar();
      };

      getDataset();
    });

    const buildCalendar = () => {
      let prevLast = new Date(today.getFullYear(), today.getMonth(), 0); // 지난달의 마지막 날
      let currentFirst = new Date(today.getFullYear(), today.getMonth(), 1); // 이번달의 첫번째 날
      let currentLast = new Date(today.getFullYear(), today.getMonth() + 1, 0); // 이번달의 마지막 날

      document.querySelector(".calYear").innerHTML = today.getFullYear() + ".";
      document.querySelector(".calMonth").innerHTML = today.getMonth() + 1;

      let htmlDates = ""; // 달력 출력을 위한 html저장
      let dates = []; // 달력에 출력될 날 배열

      if (currentFirst.getDay() != 0) {
        // 만약 이번달의 시작이 일요일이 아니면
        for (let i = 0; i < currentFirst.getDay(); i++) {
          // 지난달의 마지막 날부터 하루씩 빼면서 배열앞에 값을 넣는다
          dates.unshift(prevLast.getDate() - i);
        }
        for (let i = 0; i < dates.length; i++) {
          htmlDates +=
            `<div class="date" id="` +
            "day" +
            today.getMonth() +
            dates[i] +
            `"><div class="daynum">${dates[i]}</div></div>`;
        }
      }

      // 이번달 넣기
      for (let i = 1; i <= currentLast.getDate(); i++) {
        if (today.getMonth() + 1 < 10) {
          htmlDates +=
            `<div class="date" id="` +
            "day0" +
            (today.getMonth() + 1) +
            i +
            `"><div class="daynum">` +
            i +
            `</div></div>`;
        } else if (i < 10) {
          htmlDates +=
            `<div class="date" id="` +
            "day" +
            (today.getMonth() + 1) +
            "0" +
            i +
            `"><div class="daynum">` +
            i +
            `</div></div>`;
        } else {
          htmlDates +=
            `<div class="date" id="` +
            "day" +
            (today.getMonth() + 1) +
            i +
            `"><div class="daynum">` +
            i +
            `</div></div>`;
        }
      }

      // 다음달 넣기
      for (let i = 1; i <= 6 - currentLast.getDay(); i++) {
        if (today.getMonth() + 2 < 10) {
          htmlDates +=
            `<div class="date" id="` +
            "day0" +
            (today.getMonth() + 2) +
            i +
            `"><div class="daynum">` +
            i +
            `</div></div>`;
        } else if (i < 10) {
          htmlDates +=
            `<div class="date" id="` +
            "day" +
            (today.getMonth() + 2) +
            "0" +
            i +
            `"><div class="daynum">` +
            i +
            `</div></div>`;
        } else {
          htmlDates +=
            `<div class="date" id="` +
            "day" +
            (today.getMonth() + 2) +
            i +
            `"><div class="daynum">` +
            i +
            `</div></div>`;
        }
      }

      document.querySelector(".dates").innerHTML = htmlDates;
      settingData();
      addModalEvent();
    };

    const settingData = () => {
      for (let i = 0; i < 200; i++) {
        let searchstart =
          "day" +
          dataset.data[i].start_time.substring(5, 7) +
          dataset.data[i].start_time.substring(8, 10);
        const searchstartday = document.getElementById(searchstart);

        if (searchstartday != null) {
          searchstartday.innerHTML +=
            `<div class="dayin ${dataset.data[i].id}"><span class="start_icon">시</span>` +
            dataset.data[i].name +
            `</div>`;
        }
      }
      for (let i = 0; i < 200; i++) {
        let searchend =
          "day" +
          dataset.data[i].end_time.substring(5, 7) +
          dataset.data[i].end_time.substring(8, 10);
        const searchendday = document.getElementById(searchend);
        if (searchendday != null) {
          searchendday.innerHTML +=
            `<div class="dayin ${dataset.data[i].id}"><span class="end_icon">끝</span>` +
            dataset.data[i].name +
            `</div>`;
        }
      }
    };

    const addModalEvent = () => {
      for (let i = 0; i < 200; i++) {
        var eventlist = document.getElementsByClassName(dataset.data[i].id);
        if (eventlist.length != 0) {
          for (let j = 0; j < eventlist.length; j++) {
            eventlist[j].addEventListener("click", function () {
              showModal.value = true;
              modalData.value = dataset.data[i];
            });
          }
        }
      }
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const prevMonth = () => {
      today.setMonth(today.getMonth() - 1);
      buildCalendar();
    };

    const nextMonth = () => {
      today.setMonth(today.getMonth() + 1);
      buildCalendar();
    };

    return {
      showModal,
      modalData,
      onMounted,
      closeModal,
      prevMonth,
      nextMonth,
    };
  },
};
</script>
