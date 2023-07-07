<template>
  <div class="container">
    <div class="left">
      <h2>duration</h2>
      <div class="box">
        <el-button-group>
          <el-button type="primary" @click="changeDuration('1s')">1s</el-button>
          <el-button type="primary" @click="changeDuration('3s')">3s</el-button>
          <el-button type="primary" @click="changeDuration('5s')">5s</el-button>
        </el-button-group>
      </div>
      <h2>timing-function</h2>
      <div class="box">
        <!-- <div> -->
        <p>关键字</p>
        <el-button-group>
          <el-button type="primary" @click="changeTime('ease')">ease</el-button>
          <el-button type="primary" @click="changeTime('ease-in')">ease-in</el-button>
          <el-button type="primary" @click="changeTime('ease-out')">ease-out</el-button>
          <el-button type="primary" @click="changeTime('ease-in-out')">ease-in-out</el-button>
          <el-button type="primary" @click="changeTime('linear')">linear</el-button>
          <el-button type="primary" @click="changeTime('step-start')">step-start</el-button>
          <el-button type="primary" @click="changeTime('step-end')">step-end</el-button>
        </el-button-group>
        <!-- </div> -->
        <p>函数值</p>
        <!--cubic-bezier https://easings.net/zh-cn# -->
        <el-button-group>
          <el-button type="primary" @click="changeTime('cubic-bezier(0.1, 0.7, 1, 0.1)')">
            cubic-bezier(0.1, 0.7, 1, 0.1)
          </el-button>
          <el-button type="primary" @click="changeTime('steps(4, end)')">steps(4, end)</el-button>
        </el-button-group>
        <p>Steps 函数关键字</p>
        <p>Steps（n,y）帧动画，n分为几步执行，y 第一帧如何开始</p>
        <el-button-group>
          <el-button type="primary" @click="changeTime('steps(4, jump-start)')">steps(4, jump-start)</el-button>
          <el-button type="primary" @click="changeTime('steps(10, jump-end)')">steps(10, jump-end)</el-button>
          <el-button type="primary" @click="changeTime('steps(20, jump-none)')">steps(20, jump-none)</el-button>
          <el-button type="primary" @click="changeTime('steps(5, jump-both)')">steps(5, jump-both)</el-button>
          <el-button type="primary" @click="changeTime('steps(6, start)')">steps(6, start)</el-button>
          <el-button type="primary" @click="changeTime('steps(8, end)')">steps(8, end)</el-button>
        </el-button-group>
      </div>
      <h2>delay</h2>
      <div class="box">
        <el-button-group>
          <el-button type="primary" @click="changeDelay('0s')">1s</el-button>
          <el-button type="primary" @click="changeDelay('3s')">3s</el-button>
          <el-button type="primary" @click="changeDelay('5s')">5s</el-button>
        </el-button-group>
      </div>
      <h2>iteration-count</h2>
      <div class="box">
        <el-button-group>
          <el-button type="primary" @click="changeCount('1')">1</el-button>
          <el-button type="primary" @click="changeCount('infinite')">infinite</el-button>
        </el-button-group>
      </div>
      <h2>direction</h2>
      <div class="box">
        <el-button-group>
          <el-button type="primary" @click="changeDirection('normal')">normal</el-button>
          <el-button type="primary" @click="changeDirection('reverse')">reverse</el-button>
          <el-button type="primary" @click="changeDirection('alternate')">alternate</el-button>
          <el-button type="primary" @click="changeDirection('alternate-reverse')">alternate-reverse</el-button>
        </el-button-group>
      </div>
      <h2>fillMode</h2>
      <div class="box">
        <el-button-group>
          <el-button type="primary" @click="changeFillMode('none')">none</el-button>
          <el-button type="primary" @click="changeFillMode('forwards')">forwards</el-button>
          <el-button type="primary" @click="changeFillMode('backwards')">backwards</el-button>
          <el-button type="primary" @click="changeFillMode('both')">both</el-button>
        </el-button-group>
      </div>
      <h2>play-state</h2>
      <div class="box">
        <el-button-group>
          <el-button type="primary" @click="isPlay('paused')">paused</el-button>
          <el-button type="primary" @click="isPlay('running')">running</el-button>
        </el-button-group>
      </div>
    </div>
    <div class="right">
      <table border="1">
        <tr>
          <th>周期时间</th>
          <th>周期情况</th>
          <th>等待时间</th>
          <th>播放次数</th>
          <th>direction</th>
          <th>fillMode</th>
          <th>playState</th>
        </tr>
        <tr>
          <td>{{ durationTime }}</td>
          <td>{{ timeType }}</td>
          <td>{{ delayTime }}</td>
          <td>{{ countNubmer }}</td>
          <td>{{ directionType }}</td>
          <td>{{ fillMode }}</td>
          <td>{{ playState }}</td>
        </tr>
      </table>
      <div class="main" :style="'animation-duration:' + durationTime +
        ';animation-timing-function:' + timeType +
        ';animation-delay:' + delayTime +
        ';animation-iteration-count:' + countNubmer +
        ';animation-direction:' + directionType +
        ';animation-fill-mode:' + fillMode +
        ';animation-play-state:' + playState
        ">
        <div class="cir"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/** https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation
 * animation: duration | timing-function | delay | iteration-count | direction | fill-mode | play-state | name;
 * name 动画名称
 * duration 周期时间
 * timing-function 周期情况
 * delay 始执行动画之前等待的时间量
 * iteration-count 播放次数 n/infinite
 * direction 是否循环交替反向播放动画。
 * fill-mode 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。
 */
const durationTime = ref('3s')
const timeType = ref('linear')
const delayTime = ref('3s')
const countNubmer = ref('infinite')
const directionType = ref('reverse')
const fillMode = ref('')
const playState = ref('paused')
const changeDuration = (time: string) => {
  durationTime.value = time
}
const changeTime = (type: string) => {
  timeType.value = type
}
const changeDelay = (time: string) => {
  delayTime.value = time
}
const changeCount = (count: string) => {
  countNubmer.value = count
}
const changeDirection = (direction: string) => {
  directionType.value = direction
}
const changeFillMode = (type: string) => {
  fillMode.value = type
}
const isPlay = (type: string) => {
  playState.value = type
}
onMounted(() => {
  console.log();
});
</script>

<style scoped lang="scss">
.container {
  display: flex;

  .left {
    width: 50%;

    .box {
      margin-left: 10px;
      padding: 10px 5px;
    }

    p {
      margin: 5px;
    }
  }

  .right {
    width: 50%;
    border-left: 1px solid red;

    .main {
      padding: 20px;
      animation-name: move;
    }

    .cir {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: red;
    }
  }
}

@keyframes move {
  from {
    margin-left: 0%;
  }

  to {
    margin-left: 80%;
  }
}</style>