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

// Handle tab switching between all/interview/rejected views
function toggleTab(tabId) {
  allTabBtn.classList.remove('border-blue-500', 'text-blue-600');
  allTabBtn.classList.add('border-transparent', 'text-gray-500');

  interviewTabBtn.classList.remove('border-blue-500', 'text-blue-600');
  interviewTabBtn.classList.add('border-transparent', 'text-gray-500');

  rejectedTabBtn.classList.remove('border-blue-500', 'text-blue-600');
  rejectedTabBtn.classList.add('border-transparent', 'text-gray-500');

  const selectedTab = document.getElementById(tabId);

  if (tabId === 'all-tab-btn') {
    currentTab = 'all';
  } else if (tabId === 'interview-tab-btn') {
    currentTab = 'interview';
  } else if (tabId === 'rejected-tab-btn') {
    currentTab = 'rejected';
  }

  selectedTab.classList.remove('border-transparent', 'text-gray-500');
  selectedTab.classList.add('border-blue-500', 'text-blue-600');

  if (tabId === 'all-tab-btn') {
    allJobsSection.classList.remove('hidden');
    filteredSection.classList.add('hidden');
  } else if (tabId === 'interview-tab-btn') {
    allJobsSection.classList.add('hidden');
    filteredSection.classList.remove('hidden');
    renderInterviewJobs();
  } else if (tabId === 'rejected-tab-btn') {
    allJobsSection.classList.add('hidden');
    filteredSection.classList.remove('hidden');
    renderRejectedJobs();
  }

  calculateCounts();
}

