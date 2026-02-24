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

// Event delegation for all button clicks (interview, rejected, delete)
mainContainer.addEventListener('click', function (event) {
  if (
    event.target.classList.contains('interview-btn') ||
    event.target.parentElement.classList.contains('interview-btn')
  ) {
    const button = event.target.classList.contains('interview-btn') ? event.target : event.target.parentElement;
    const card = button.closest('.job-card');

    const jobInfo = extractJobInfo(card);
    jobInfo.status = 'Interview';

    const jobExists = interviewList.find(
      item => item.companyName === jobInfo.companyName && item.position === jobInfo.position
    );

    if (!jobExists) {
      interviewList.push(jobInfo);
    }

    rejectedList = rejectedList.filter(
      item => !(item.companyName === jobInfo.companyName && item.position === jobInfo.position)
    );

    if (currentTab === 'rejected') {
      renderRejectedJobs();
    }

    calculateCounts();
  } else if (
    event.target.classList.contains('rejected-btn') ||
    event.target.parentElement.classList.contains('rejected-btn')
  ) {
    const button = event.target.classList.contains('rejected-btn') ? event.target : event.target.parentElement;
    const card = button.closest('.job-card');

    const jobInfo = extractJobInfo(card);
    jobInfo.status = 'Rejected';

    const jobExists = rejectedList.find(
      item => item.companyName === jobInfo.companyName && item.position === jobInfo.position
    );

    if (!jobExists) {
      rejectedList.push(jobInfo);
    }

    interviewList = interviewList.filter(
      item => !(item.companyName === jobInfo.companyName && item.position === jobInfo.position)
    );

    if (currentTab === 'interview') {
      renderInterviewJobs();
    }

    calculateCounts();
  } else if (
    event.target.classList.contains('btn-delete') ||
    event.target.parentElement.classList.contains('btn-delete')
  ) {
    const button = event.target.classList.contains('btn-delete') ? event.target : event.target.parentElement;
    const card = button.closest('.job-card');

    const jobInfo = extractJobInfo(card);

    interviewList = interviewList.filter(
      item => !(item.companyName === jobInfo.companyName && item.position === jobInfo.position)
    );
    rejectedList = rejectedList.filter(
      item => !(item.companyName === jobInfo.companyName && item.position === jobInfo.position)
    );

    card.remove();

    if (currentTab === 'interview') {
      renderInterviewJobs();
    } else if (currentTab === 'rejected') {
      renderRejectedJobs();
    }

    calculateCounts();
  }
});

