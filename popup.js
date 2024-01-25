document.addEventListener('DOMContentLoaded', function() {
  var dropdown = document.getElementById('combinedOptions');
  var note = document.getElementById('contextualNote');
  var fillDetailsButton = document.getElementById('fillDetails');
  print('hi');

  // Samples
  var optionsData = [
    { option: 'BELT Training: Unproductive,-1', note: 'Agent was taking the BELT during their shift' },
    { option: 'Client approved leave: Productive,1', note: 'If client gives an agent less than a full day of paid leave. Use for paid leaves ONLY.' },
    { option: 'Coaching: Productive,1', note: 'Any meetings, one-on-one or as a group, that happen exclusively with Anchora managers in office, including coaching but not including meetings with HR. ' },
    { option: 'Desktime Issues: Productive,1', note: 'If the agent started working with the expectation that DeskTime was already tracking, but it was not.' },
    { option: 'Early out: Unproductive,-1', note: 'Agent left their shift early (without client approving paid leave)' },
    { option: 'Forgot to start timer: Productive,1', note: 'If the agent started working at the start of their shift or following their lunch/break but either didn&quot;t start DeskTime or forgot to turn off private time.' },
    { option: 'HR meeting: Productive,1', note: 'Any meeting or event the agent is doing that involves the HR department' },
    { option: 'Internet Issues: Unproductive,-1', note: 'Agent is experiencing connection issues not related to their VPN and is unable to work normally' },
    { option: 'Late in: Unproductive,-1', note: 'Agent arrived late to their shift' },
    { option: 'No valid reason: Unproductive,-1', note: 'Agent was out of office or away from desk and did not provide any valid reason for their absence' },
    { option: 'Overbreak: Unproductive,-1', note: 'Agent went over their allotted break time' },
    { option: 'PC Issues: Unproductive,-1', note: 'Tech issues related to the agent&quot;s hardware (PC, monitors, M/KB, phone, etc)' },
    { option: 'Power Outage: Unproductive,-1', note: 'If the power in the office goes out, or a remote agent loses power at home' },
    { option: 'Private time: Unproductive,-1', note: 'Agent forgot to switch their timer to private time when taking a break. If the agent forgot to turn off private time after their break, instead use "Forgot to start timer"' },
    { option: 'Technical Issues: Unproductive,-1', note: 'Tech issues not related to the agent&quot;s hardware or internet connection directly. Includes issues with softphones, software, file access, VPNs, etc.' },
    { option: 'Training: Productive,1', note: 'For organized training sessions not including initial agent training. Full day training should be logged on the absence calendar' },
    { option: 'Unpaid leave: Unproductive,-1', note: 'Agent was out of the office less than a full day and gave us notification as to why, whether or not that info is verified' },
    { option: 'Working: Productive,1', note: 'If a slow day or low workload is causing inactivity not as a result of the agent slacking.' },
    { option: 'Unassigned: Productive,1', note: 'If an agent is currently not assigned to a client team but is present and would be available to work.' },
    
  ];

  // Populate the dropdown with options
  optionsData.forEach(function(item) {
      var opt = document.createElement('option');
      opt.value = item.option;
      opt.textContent = item.option.split(':')[0]; // Display only the reason part in dropdown
      dropdown.appendChild(opt);
  });

  // Update note based on selection
  dropdown.addEventListener('change', function() {
      var selectedValue = this.value;
      var selectedOption = optionsData.find(function(item) {
          return item.option === selectedValue;
      });
      note.textContent = selectedOption.note;
  });

  // Fill details button click handler
  fillDetailsButton.addEventListener('click', function() {
      var selectedValue = dropdown.value;
      var selectedText = selectedValue.split(',')[0];
      var selectedRadioValue = selectedValue.split(',')[1];

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tabIdv = tabs[0].id; // Get the current tab's ID
        chrome.scripting.executeScript({
            target: { tabId: tabIdv },
            func: function(selectedText, selectedRadioValue) {
                document.getElementById("description").value = selectedText;
                var labels = document.querySelectorAll(".btn-productivity-group label");
                labels.forEach(function(label) {
                    var input = label.querySelector("input[type='radio']");
                    if (input && input.value === selectedRadioValue) {
                        label.click();
                    }
                });
            },
            args: [selectedText, selectedRadioValue]
        });
    });
    
  });

  // Initialize the note when the popup is first opened
  dropdown.dispatchEvent(new Event('change'));
});
