// import Vue from 'vue'
import { deviceEnquire, DEVICE_TYPE } from "@/utils/device";
import { mapState } from "vuex";

const mixinDevice = {
  computed: {
    ...mapState({
      device: state => state.app.device
    })
  },
  methods: {
    isMobile() {
      return this.device === DEVICE_TYPE.MOBILE;
    },
    isDesktop() {
      return this.device === DEVICE_TYPE.DESKTOP;
    },
    isTablet() {
      return this.device === DEVICE_TYPE.TABLET;
    }
  }
};

const AppDeviceEnquire = {
  mounted() {
    const { $store } = this;
    deviceEnquire(deviceType => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          $store.commit("TOGGLE_DEVICE", "desktop");
          break;
        case DEVICE_TYPE.TABLET:
          $store.commit("TOGGLE_DEVICE", "tablet");
          break;
        case DEVICE_TYPE.MOBILE:
        default:
          $store.commit("TOGGLE_DEVICE", "mobile");
          break;
      }
      console.log(this.device);
    });
  }
};
const LazyComponent = {
  mounted() {
    let _this = this;
    // 创建一个观察者
    let observer = new IntersectionObserver(onIntersection);
    let lazy = this.$refs.lazy;
    //监听 lazy 这个DOM 节点
    observer.observe(lazy);

    // 定义回调
    function onIntersection(entries) {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          observer.unobserve(entry.target);
          console.log(entry.target);
          _this.isSendRequest = true;
        }
      });
    }
  }
};
export { AppDeviceEnquire, mixinDevice, LazyComponent };
