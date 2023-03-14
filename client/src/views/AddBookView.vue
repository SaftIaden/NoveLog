<template>
  <q-layout id="app">
    <Header />
    <q-page-container>
      <div class="row justify-evenly q-mt-lg">
        <q-dialog :maximized="maximizedToggle" v-model="fullHeight" transition-show="slide-up" transition-hide="slide-down">
          <q-card class="column full-height" style="max-width: 100%">
            <q-card-section align="center">
              <div class="text-h6">Take Picture</div>
            </q-card-section>

            <q-card-section align="center" class="col q-pt-none">
              <video ref="camera" autoplay style="height: 100%"></video>
            </q-card-section>
            <q-card-actions align="center" class="bg-white">
              <div class="justify-center">
                <div class="bg-black q-pa-md">
                  <q-btn class="text-white" icon="fa-solid fa-arrows-rotate" flat @click="changeCamera()"></q-btn>
                  <q-btn class="text-white" icon="fa-solid fa-camera" flat @click="takePhoto()" v-close-popup></q-btn>
                  <q-btn class="text-white" icon="fa-solid fa-x" flat v-close-popup />
                </div>
              </div>
            </q-card-actions>
          </q-card>
        </q-dialog>

        <div class="col-5">
          <q-img :src="coverImage" style="border-radius: 20px" @click="(fullHeight = true), start()"> </q-img>
        </div>
        <div class="col-5">
          <q-input item-aligned v-model="title" autogrow hint="Title"
            ><template v-slot:prepend>
              <q-icon name="fa-solid fa-pen-nib" />
            </template>
          </q-input>
          <q-input item-aligned v-model="author" autogrow hint="Author">
            <template v-slot:prepend> <q-icon name="fa-solid fa-user-pen" /> </template>
          </q-input>
          <div class="q-mt-md">
            <q-rating v-model="ratingModel" size="2em" color="dark" icon="fa-regular fa-star" icon-selected="fa-solid fa-star" />
          </div>
          <div class="q-mt-lg">
            <q-select rounded outlined v-model="readStatus" color="dark" :options="readOptions" option-value="id" option-label="desc" dense emit-value map-options behavior="menu" bg-color="info" />
          </div>
        </div>
      </div>
      <div class="q-ma-sm">
        <div class="row justify-evenly text-center">
          <div class="col-6">
            <q-input style="max-width: 180px" item-aligned v-model="genre" autogrow hint="Genre"
              ><template v-slot:prepend>
                <q-icon name="fa-solid fa-compact-disc" />
              </template>
            </q-input>
          </div>
          <div class="col-5">
            <q-input style="max-width: 170px" item-aligned v-model="allPages" hint="Nr. of Pages" maxlength="4"
              ><template v-slot:prepend>
                <q-icon name="fa-solid fa-file" />
              </template>
            </q-input>
          </div>
        </div>
      </div>
      <div class="q-pa-sm q-ma-sm">
        <span class="text-h5 block q-my-md"><b>Description</b></span>
        <div class="" style="max-width: 80%px">
          <q-input v-model="description" item-aligned autogrow hint="Description">
            <template v-slot:prepend>
              <q-icon name="fa-solid fa-paragraph" />
            </template>
          </q-input>
        </div></div
    ></q-page-container>
    <q-page-sticky position="bottom" :offset="[0, 100]">
      <div class="row justify-center">
        <q-btn type="submit" color="info" class="btn q-mt-lg postButton" rounded @click="postBook()">
          <div style="color: black">Add Book</div>
        </q-btn>
      </div>
    </q-page-sticky>
    <q-page-sticky position="bottom" :offset="[18, 18]">
      <NavBar class="q-mb-md" />
    </q-page-sticky>
  </q-layout>
</template>
<script setup>
import NavBar from '../components/NavBar.vue';
import Header from '../components/Header.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';

const ratingModel = ref(0);
const readStatus = ref(false);
const readOptions = [
  { id: true, desc: 'Finished' },
  { id: false, desc: 'in Progress' },
];
const allPages = ref();
const genre = ref();
const title = ref();
const description = ref();
const author = ref();
const fullHeight = ref(false);
const maximizedToggle = ref(true);

const camera = ref();

const availableCameras = [];
let currentVideoSource;
let images = ref([]);
const imageBlobs = [];
let imageCapture;
let coverImage = ref('http://localhost:3000/images/nocover.png');

function getUserMedia(options, successCallback, failureCallback) {
  var api = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  if (api) {
    return api.bind(navigator)(options, successCallback, failureCallback);
  }
}

var theStream;

async function takePhoto() {
  if (!('ImageCapture' in window)) {
    alert('ImageCapture is not available');
    return;
  }

  if (!theStream) {
    alert('Grab the video stream first!');
    return;
  }

  var theImageCapturer = new ImageCapture(theStream.getVideoTracks()[0]);

  theImageCapturer
    .takePhoto()
    .then((blob) => {
      var theImageTag = document.getElementById('imageTag');
      images.value = [];
      images.value.push(URL.createObjectURL(blob));
      coverImage.value = URL.createObjectURL(blob);
    })
    .catch((err) => alert('Error: ' + err));
}

navigator.mediaDevices.enumerateDevices().then(gotDevices);

const start = () => {
  if (!navigator.getUserMedia && !navigator.webkitGetUserMedia && !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
    alert('User Media API not supported.');
    return;
  }

  var constraints = {
    video: true,
  };

  getUserMedia(
    constraints,
    function (stream) {
      var mediaControl = document.querySelector('video');
      if ('srcObject' in mediaControl) {
        mediaControl.srcObject = stream;
      } else if (navigator.mozGetUserMedia) {
        mediaControl.mozSrcObject = stream;
      } else {
        mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
      }
      theStream = stream;
    },
    function (err) {
      alert('Error: ' + err);
    },
  );
};

function gotDevices(deviceInfos) {
  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];
    if (deviceInfo.kind === 'videoinput') {
      availableCameras.push(deviceInfo.deviceId);
    } else {
      // console.log('Some other kind of source/device: ', deviceInfo);
    }
    // console.log(availableCameras);
  }
}

const changeCamera = () => {
  const index = availableCameras.findIndex((el) => el === currentVideoSource);
  if (availableCameras[index + 1] !== undefined) currentVideoSource = availableCameras[index + 1];
  else currentVideoSource = availableCameras[0];
  start();
};

// const deleteImage = () => {};

onMounted(async () => {});

const postBook = async () => {
  await axios.post('http://127.0.0.1:3000/books', {
    title: title.value,
    image: coverImage.value,
    author: author.value,
    rating: ratingModel.value,
    read: readStatus.value,
    genre: genre.value,
    pages: allPages.value,
    description: description.value,
  });
};
</script>
<style scoped>
.postButton {
  width: 80vw;
  height: 5vh;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
