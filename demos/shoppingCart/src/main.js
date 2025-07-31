import { defineCustomElement } from 'vue';
import TeacherCheckInBtn from './TeacherShoppingBtn.ce.vue';
import StudentModal from './StudentModal.ce.vue';
const TeacherCheckInBtnEl = defineCustomElement(TeacherCheckInBtn, { shadowRoot: false });
customElements.define('teacher-checkin-btn', TeacherCheckInBtnEl);
const StudentModalEl = defineCustomElement(StudentModal, { shadowRoot: false });
customElements.define('student-modal', StudentModalEl);
TCICCustomUI.hooks(TCICCustomUI.THookType.Menus_BeforeMount).tap((event) => {
    if (TCIC.SDK.instance.isTeacher()) {
    const menus = event.payload;
    console.log('menus', menus);
    menus.unshift({
      name: 'teacher-checkin-btn',
      enable: true,
      isSub: true,
      role: {
        teacher: {
          classType: ['unitedrtc'],
        },
      },
    });
  } 
});
TCIC.SDK.instance.promiseState('TStateComponentLoaded', true).then(() => {
  if (TCIC.SDK.instance.isStudent()) {
    document.body.appendChild(document.createElement('student-modal'));
  }
});