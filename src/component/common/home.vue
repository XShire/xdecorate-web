<template>
    <div class="home-main-grid" id="home-main-grid">
        <div class="demo-badge-container">
            <a href="../xdecorate/project/mobile/sign_add#x-layer-1">
                <mu-badge content="签到" class="demo-badge-content">
                    <mu-icon value="alarm_on"/>
                </mu-badge>
            </a>
            <a href="../xdecorate/project/mobile/diary_add">
                <mu-badge content="添加日志" class="demo-badge-content">
                    <mu-icon value="event_note"/>
                </mu-badge>
            </a>
            <a href="../xdecorate/project/mobile/plan_add">
                <mu-badge content="添加计划" class="demo-badge-content">
                    <mu-icon value="event_available"/>
                </mu-badge>
            </a>
            <a href="../xdecorate/project/mobile/approval_add">
                <mu-badge content="审批申请" class="demo-badge-content">
                    <mu-icon value="playlist_add"/>
                </mu-badge>
            </a>
        </div>

    </div>
</template>

<script>

    export default {
        data() {
            return {}
        }
    }

</script>

<style lang="less">
    .home-main-grid {
        padding-top: 0;
        padding-bottom: 56px;
    }

    .demo-badge-container {
        padding-top: 1rem;
        font-size: 0;
    }

    .demo-badge-content {
        width: 25%;
        padding: 1rem;
        text-align: center;
        .mu-badge {
            background-color: inherit;
            color: inherit;
            color: #222;
        }
        .mu-badge-float {
            position: inherit;
            top: 0;
            right: 0;
            line-height: 2;
        }
    }
</style>

