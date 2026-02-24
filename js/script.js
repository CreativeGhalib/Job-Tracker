// Track job lists and current view
let interviewList = [];
let rejectedList = [];
let currentTab = 'all';

const total = document.getElementById('total');
const interviewCount = document.getElementById('interviewCount');
const rejectedCount = document.getElementById('rejectedCount');
const jobsCount = document.getElementById('jobsCount');

const allTabBtn = document.getElementById('all-tab-btn');
const interviewTabBtn = document.getElementById('interview-tab-btn');
const rejectedTabBtn = document.getElementById('rejected-tab-btn');

const allJobsSection = document.getElementById('allJobs');
const mainContainer = document.querySelector('main');
const filteredSection = document.getElementById('filtered-section');

function calculateCounts() {
  const totalJobs = allJobsSection.children.length;
  total.innerText = totalJobs;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;

  if (currentTab === 'all') {
    jobsCount.innerText = totalJobs;
  } else if (currentTab === 'interview') {
    jobsCount.innerText = interviewList.length;
  } else if (currentTab === 'rejected') {
    jobsCount.innerText = rejectedList.length;
  }
}

calculateCounts();

