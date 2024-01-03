<template>
  <div class="">
    <h1 class="text-center mt-5 mb-8">شرح استخدام الموقع</h1>
    <div class="flex flex-col md:flex-row align-content-around gap-4 justify-content-center">
      <Accordion class="w-9 md:w-1/2 rtl" :activeIndex="0">
        <AccordionTab
          header="شرح"
          :pt="{
            headerTitle: ' font-bold mr-1'
          }"
        >
          <h4>الخطوة الاولى</h4>
          <p class="line-height-3">
            من الكمبيوتر أو اللابتوب، تتوجه إلى الخدمات الأكاديمية
            <a
              class="link"
              href="https://login.psau.edu.sa/login?service=https://eserve.psau.edu.sa/ku/casLogin"
              target="_blank"
              rel="noopener noreferrer"
            >
              من هنا
            </a>
            <br />
            ثم تدخل حسابك بعدها تتوجه الى المقررات المطروحة وفق الخطة.
          </p>
          <h4>الخطوة الثانية</h4>
          <p class="line-height-3">
            بعد الدخول إلى المقررات المطروحة وفق الخطة، اضغط Ctrl + S لحفظ الصفحة كملف HTML.
            <br />
            ثم تتوجه إلى صفحة
            <router-link class="link" to="/schedules">الجداول</router-link>
            في موقعنا وترفع الملف.
          </p>
          <h4>الخطوة الثالثة</h4>
          <p class="line-height-3">بعد ماترفع الملف تقدر تختار المواد الي تبغاها من هنا</p>
          <div>
            <Image src="src\assets\selectCourse.png" width="250" preview />
          </div>
          <h4>الخطوة الرابعة</h4>
          <p>بعد ماتختار المواد الي تبغاها، تقدر تختار شعبة معينة اذا بغيت من هنا</p>
          <div>
            <Image src="src\assets\selectSection.png" width="250" preview />
          </div>
          <p>ملاحظة* كل مادة تقدر تختار لها شعبة واحدة فقط</p>
          <h4>الخطوة الخامسة</h4>
          <p class="line-height-3">بعد ماتختار المواد والشعب، تقدر تغير في الفلاتر زي مايعجبك</p>
          <div>
            <Image src="src\assets\filters.png" width="700" preview v-if="width >= 768" />
            <Image src="src\assets\filters.png" width="300" preview v-else />
          </div>
          <p class="line-height-3">
            في البداية تقدر تختار عدد ايام الاوف الي تبغاها تكون في الجدول وأيضا تقدر تخصصها اذا
            بغيت,
            <br />
            مثلا تقدر تختار يكون عندك يوم اوف واحد وتخليه يوم الاحد وتقدر تختار يكون عندك يومين اوف
            وتخليهم يوم الاحد والاثنين وهكذا.
          </p>
          <div>
            <Image src="src\assets\breakHours.png" width="250" preview />
          </div>
          <p class="line-height-3">
            وبالنسبة لساعات البريك المقصود فيها البريكات الي بين المحاضرات للجدول كامل,
            <br />
            .مثلا تقدر تختار عدد ساعات البريك تكون ساعة فقط وراح يكون مجموع البريكات ساعة فقط للجدول كامل 
          </p>
          <div>
            <Image src="src\assets\open.png" width="250" preview />
          </div>
          <p class="line-height-3">
            بالنسبة للفلتر هذا، إذا ألغيته فلن يتم إنشاء إلا جداول تكون الشعب فيها مفتوحة.
            <br />
            أما إذا تركته مفعلًا، فسيتم إنشاء جداول تضم الشعب المغلقة أيضًا، وستتمكن من التمييز بين
            الشعب المغلقة والمفتوحة.
          </p>
          <h4>الخطوة الأخيرة</h4>
          <p class="line-height-3">
            بعد ماتختار الفلاتر الي تبغاها، تقدر تضغط على زر
            <span class="text-purple-400 font-bold">تأكيد</span> وينشأ لك جميع الجداول الممكنة.
          </p>
        </AccordionTab>
        <AccordionTab header="الجدول">
          <div class="text-center">
            <div class="text-right">
              <p class="line-height-3">
                هذا هو شكل الجدول الذي سيظهر لك. في أعلى الجدول، يوجد زران: الزر الأول
                <i class="pi pi-bookmark mr-1 ml-1 text-purple-300"></i>
                هو زر الحفظ، وهو متاح فقط للمستخدمين المسجلين في الموقع. يتيح لك هذا الزر الرجوع إلى
                الجداول التي أنت مهتم بها في صفحة             
                <router-link class="link" to="/profile">الملف الشخصي</router-link>
                في أي وقت وحفظها كصورة.
              </p>
              <p class="line-height-3">
                أما الزر الثاني
                <i class="pi pi-info-circle"></i>
                فهو زر المعلومات، وهو متاح للجميع. يقدم لك هذا الزر معلومات عن الجدول.
              </p>
            </div>
            <Image
              src="src\assets\schedule.png"
              alt="schedule"
              width="500"
              preview
              v-if="width > 700"
            />
            <Image src="src\assets\schedule.png" alt="schedule" width="300" preview v-else />
          </div>
          <p class="line-height-3">
            هذا هو شكل المحاضرة. بجوار رقم الشعبة، ستجد أيقونات مختلفة تعبر عن نوع المحاضرة. كل
            أيقونة تمثل حالة معينة: إما محاضرة
            <i class="fa-solid fa-person-chalkboard"></i>
            ، أو عملي
            <i class="fa-solid fa-microscope"></i>
            ، أو تمارين
            <i class="fa-solid fa-file-pen"></i>
            .
            <br />
            والأيقونة الأخيرة هي الأهم، فهي تعبر عن حالة الشعبة:
            <i class="pi pi-lock"></i>
            القفل يعني ان الشعبة مغلقة.
          </p>
          <div class="flex align-content-center gap-8" v-if="width > 700">
            <Image src="src\assets\lecture.png" alt="lecture" width="150" />
            <Image src="src\assets\closeLecture.png" alt="lab" width="150" />
          </div>
          <div class="flex align-content-center gap-8" v-else>
            <Image src="src\assets\lecture.png" alt="lecture" width="100" />
            <Image src="src\assets\closeLecture.png" alt="lab" width="100" />
          </div>
          <p class="line-height-3">
            اما محاضرات التي مدتها ساعة او اقل شكلها مختلف قليلا,
            إذا ضغطت على هذا الزر
            <i class="pi pi-info-circle mr-1  "></i>
            ستظهر لك معلومات عن المحاضرة.
          </p>
          <div  class="flex align-content-center gap-8">
            <Image src="src\assets\oneH.png" alt="lecture" width="130" />
            <Image src="src\assets\oneHour.png" alt="lecture" width="150" />
          </div>
        </AccordionTab>
      </Accordion>
    </div>
  </div>
</template>

<script setup>
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Image from 'primevue/image'
import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()
</script>

<style scoped>
.link {
  color: #007bff;
  text-decoration: none;
}
</style>
