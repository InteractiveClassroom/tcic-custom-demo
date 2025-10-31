// 整体控制
TCIC.SDK.instance.setState(TCIC.TMainState.Join_Quit_Tips, false); 

// 根据 userId精确控制
TCIC.SDK.instance.setMemberJoinExitRoomInfoFilter(function (msg) {
    console.log('filterMsg', msg);
    // return true 表示过滤掉进房消息
    return true;
});

// 根据 角色精确控制
TCIC.SDK.instance.setMemberJoinExitRoomInfoFilter(({ msg }) => {
    try {
        if (JSON.parse(msg.data).data.data[0].role === 3) {
            return true
        }
    } catch (error) {
        console.log('error', error);
    }
    // return true 表示过滤掉进房消息
    return false;
});
