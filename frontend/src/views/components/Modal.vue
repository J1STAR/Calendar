<template>
  <div class="modal">
    <div class="modal-inner">
      <div @click="close" class="close-btn">X</div>
      <div class="modal-header">
        <img class="modal-image" :src="modalData.image" />
        <div>
          <div>{{ modalData.name }}</div>
          <div>{{ modalData.start_time }}~{{ modalData.end_time }}</div>
        </div>
      </div>
      <div class="modal-mid">
        <div class="modal-content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";

export default {
  props: {
    modalData: { type: Object },
  },
  setup(props, { emit }) {
    console.log(props.modalData);

    onMounted(() => {
      document.querySelector(".modal-content").innerHTML =
        props.modalData.content;
    });

    const close = () => {
      console.log("?");
      emit("close");
    };

    return {
      onMounted,
      close,
    };
  },
};
</script>
