<template>
  <div class="channel-eidt">
    <van-cell :border="false">
      <div slot="title" class="title-text">
        我的频道
      </div>
      <van-button class="eit-btn" type="danger" plain round size="mini" @click="isEdit = !isEdit">
        {{isEdit ? '完成':'编辑'}}
      </van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item  class="grid-item" v-for="(channel,index) in myChannels" :key="index">
         <van-icon v-show="isEdit && !fixChannel.includes(channel.id)" slot="icon" name="clear"></van-icon>
        <span class="text" :class="{active: index === active}" slot="text">{{ channel.name }}</span>
      </van-grid-item>
    </van-grid>
    <!--    频道推荐 开始-->
    <van-cell :border="false">
      <div slot="title" class="title-text">
        频道推荐
      </div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item @click="onAddChannel(channel)" icon="plus" class="grid-item" v-for="channel in recommendchannel" :key="channel.id"
                     :text="channel.name"/>
    </van-grid>
    <!--    频道推荐结束-->
  </div>
</template>

<script>
import {channelApi} from '@/api/channel'
import {login} from "@/api/user";

export default {
  name: "ChannelEidt",
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [], //所有频道
      isEdit:false, // 控制频道的编辑与现实
      fixChannel:[0]//固定频道不允许删除
    }
  },
  computed: {
    recommendchannel() {
      return this.allChannels.filter((item)=>{
        return !this.myChannels.find(my => {return my.id === item.id})
      })
     //  const channels =[]
     //  this.allChannels.forEach((channel) => {
     //    const res = this.myChannels.find((mychannel) => {
     //      return mychannel.id === channel.id
     //    })
     //  // 如果我的频道没有推荐频道那么就返回
     //    console.log(res)
     //    if(!res) {
     //      channels.push(channel)
     //    }
     //  })
     // // 把计算结果返回
     //
     //
     //  return channels
    },

  },
  created() {
    this.getChannelAll()
  },
  methods: {
    async getChannelAll() {
      try {
        const {data: res} = await channelApi()
        this.allChannels = res.data.channels

      } catch (err) {
        this.$toast("获取数据失败")
      }
    },
    onAddChannel(channel){
      this.myChannels.push(channel)
      console.log(channel)
    },
    //删除 我的频道内容

  }
}
</script>

<style lang="less" scoped>
.channel-eidt {
  padding: 85px 0
}

.title-text {
  font-size: 32px;
  color: #333333;
}

.eit-btn {
  width: 104px;
  height: 48px;
  font-size: 26px;
  color: #f85959;
  border: 1px solid #f85959;
}

.grid-item {
  width: 160px;
  height: 86px;

  /deep/ .van-grid-item__content {
    background: #f4f5f6;
    white-space: nowrap;

    .active {
      color: red;
    }
  }

  .van-grid-item__text, .text {
    font-size: 28px;
    color: #222222;
  }
}

/deep/ .recommend-grid .van-grid-item__content {
  flex-direction: row;

  .van-icon-plus {
    font-size: 28px;
    margin-right: 6px;
  }

}

/deep/ .van-grid-item__text {
  margin-top: 0;
}

/deep/ .van-icon-clear {
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 30px;
  color: #cacaca;
  z-index: 2;
}
/deep/ .van-grid-item__icon-wrapper {
  position: unset;
}

.active {

}

</style>
