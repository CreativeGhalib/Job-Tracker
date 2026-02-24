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
    jobsCount.innerText = `${interviewList.length} of ${totalJobs}`;
  } else if (currentTab === 'rejected') {
    jobsCount.innerText = `${rejectedList.length} of ${totalJobs}`;
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

    // Update badge color to green
    const badge = card.querySelector('.text-xs.px-2');
    badge.className = 'text-xs px-2 py-0.5 bg-green-500 text-white rounded inline-block mb-2';
    badge.innerText = 'INTERVIEW';

    if (currentTab === 'rejected') {
      renderRejectedJobs();
    } else if (currentTab === 'interview') {
      renderInterviewJobs();
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

    // Update badge color to red
    const badge = card.querySelector('.text-xs.px-2');
    badge.className = 'text-xs px-2 py-0.5 bg-red-500 text-white rounded inline-block mb-2';
    badge.innerText = 'REJECTED';

    if (currentTab === 'interview') {
      renderInterviewJobs();
    } else if (currentTab === 'rejected') {
      renderRejectedJobs();
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

// Pull job data from a card element
function extractJobInfo(card) {
  const companyName = card.querySelector('.companyName').innerText;
  const position = card.querySelector('.position').innerText;
  const location = card.querySelector('.location').innerText;
  const type = card.querySelector('.type').innerText;
  const salary = card.querySelector('.salary').innerText;
  const description = card.querySelector('.description').innerText;

  return {
    companyName,
    position,
    location,
    type,
    salary,
    description,
    status: 'Available',
  };
}

function renderInterviewJobs() {
  filteredSection.innerHTML = '';

  if (interviewList.length === 0) {
    filteredSection.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-file-alt"></i>
                <h3>No jobs available</h3>
                <p>Check back soon for new job opportunities</p>
            </div>
        `;
    return;
  }

  const container = document.createElement('div');
  container.className = 'space-y-3';

  for (let job of interviewList) {
    const card = createJobCard(job);
    container.appendChild(card);
  }

  filteredSection.appendChild(container);
}

function renderRejectedJobs() {
  filteredSection.innerHTML = '';

  if (rejectedList.length === 0) {
    filteredSection.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-file-alt"></i>
                <h3>No jobs available</h3>
                <p>There is no rejected job available right now</p>
            </div>
        `;
    return;
  }

  const container = document.createElement('div');
  container.className = 'space-y-3';

  for (let job of rejectedList) {
    const card = createJobCard(job);
    container.appendChild(card);
  }

  filteredSection.appendChild(container);
}

function createJobCard(job) {
  const card = document.createElement('div');
  card.className = 'job-card bg-white border border-gray-200 rounded-lg p-4 relative';

  let badgeClass = 'text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded inline-block mb-2';
  let badgeText = 'NOT APPLIED';

  if (job.status === 'Interview') {
    badgeClass = 'text-xs px-2 py-0.5 bg-green-500 text-white rounded inline-block mb-2';
    badgeText = 'INTERVIEW';
  } else if (job.status === 'Rejected') {
    badgeClass = 'text-xs px-2 py-0.5 bg-red-500 text-white rounded inline-block mb-2';
    badgeText = 'REJECTED';
  }

  card.innerHTML = `
        <div class="flex justify-between">
            <div class="flex-1">
                <h3 class="companyName text-sm font-bold text-gray-900 mb-1">${job.companyName}</h3>
                <p class="position text-xs text-blue-600 mb-2">${job.position}</p>
                <p class="text-xs text-gray-500 mb-2">
                    <span class="location">${job.location}</span> • <span class="type">${job.type}</span> • <span class="salary">${job.salary}</span>
                </p>
                <p class="${badgeClass}">${badgeText}</p>
                <p class="description text-xs text-gray-600 mb-3">${job.description}</p>

                <div class="flex gap-2">
                    <button class="interview-btn px-3 py-1.5 border-2 border-teal-500 text-teal-500 rounded text-xs font-semibold hover:bg-teal-50 transition">INTERVIEW</button>
                    <button class="rejected-btn px-3 py-1.5 border-2 border-red-500 text-red-500 rounded text-xs font-semibold hover:bg-red-50 transition">REJECTED</button>
                </div>
            </div>
            <button class="btn-delete text-gray-400 hover:text-gray-600 absolute top-4 right-4">
                <i class="fa-solid fa-trash text-sm"></i>
            </button>
        </div>
    `;

  return card;
}
