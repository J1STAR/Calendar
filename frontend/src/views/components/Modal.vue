<template>
  <div class="modal">
    <div class="modal-inner">
      <div @click="close" class="close-btn">X</div>
      <div class="modal-header">
        <img class="modal-image" :src="modalData.image" />
        <div class="modal-info">
          <span class="modal-name">{{ modalData.name }}</span>
          <span class="modal-time">{{ start_time }} ~ {{ end_time }}</span>
          <span>{{ minus_date }}</span>
        </div>
      </div>
      <div class="modal-mid">
        <div class="modal-content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  props: {
    modalData: { type: Object },
  },
  setup(props, { emit }) {
    var start_time = ref("");
    var end_time = ref("");
    var minus_date = ref("");
    onMounted(() => {
      document.querySelector(".modal-content").innerHTML =
        props.modalData.content;

      console.log(props.modalData.start_time);

      start_time.value =
        props.modalData.start_time.substring(0, 10).replaceAll("-", ".") +
        " " +
        props.modalData.start_time.substring(11, 16);

      end_time.value =
        props.modalData.end_time.substring(0, 10).replaceAll("-", ".") +
        " " +
        props.modalData.end_time.substring(11, 16);

      const today = new Date();
      const calc = 1000 * 60 * 60 * 24;
      const start = new Date(props.modalData.start_time) / calc;
      const end = new Date(props.modalData.end_time) / calc;
      console.log(start, end, start - end);

      if (new Date(props.modalData.end_time) - today == 0) {
        minus_date.value = "오늘";
      } else if (new Date(props.modalData.end_time) - today > 0) {
        var temp1 = Math.ceil(
          (today - new Date(props.modalData.end_time)) / calc
        );
        minus_date.value = temp1 + "일 전";
      } else {
        var temp2 =
          Math.floor(new Date(props.modalData.end_time) / calc) -
          Math.floor(today / calc);
        minus_date.value = temp2 * -1 + "일 지남";
      }
    });

    const close = () => {
      emit("close");
    };

    return {
      onMounted,
      start_time,
      end_time,
      minus_date,
      close,
    };
  },
};
</script>
