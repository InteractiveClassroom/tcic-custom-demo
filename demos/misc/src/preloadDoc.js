TCICCustomUI.hooks(TCICCustomUI.THookType.Default_Doc_Before_Load).tap((event) => {
  console.log('Default_Doc_Before_Load', event.payload);
  const defaultDoc = event.payload[0];
  if (defaultDoc.bindType === 1) {
    const { docType, docUrl, docName } = defaultDoc;
    if (docType === 'jpg' || docType === 'png' || docType === 'gif') {
      // 这里的 tBoard 是互动白板实例 see: https://cloud.tencent.com/document/product/1137/39999
      const tBoard = TCIC.SDK.instance.getBoard();
      tBoard.addImagesFile([docUrl], docName);
    } else if (docType === 'mp3') {
          const audioComponent = TCIC.SDK.instance.getComponent('audio-player-component');
          // const audioVue = audioComponent.getVueInstance();
          // audioVue.audio = {
          //   documentId: defaultDoc.docId,
          //   name: docName,
          //   path: defaultDoc.transcodeType > 0 ? defaultDoc.transcodeResult : docUrl,
          // }
          // audio.show();
        audioComponent.getVueInstance().play({
          id: defaultDoc.docId,
          name: docName,
          path: defaultDoc.transcodeType > 0 ? defaultDoc.transcodeResult : docUrl,
        });
    } else if (docType === 'mp4') {
      teduBoard.addVideoFile(defaultDoc.transcodeType > 0 ? defaultDoc.transcodeResult : docUrl, docName);
    }
  }
});