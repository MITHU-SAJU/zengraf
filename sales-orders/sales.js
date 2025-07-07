
  function addItemRow() {
    const container = document.getElementById('item-container');

    const newRow = document.createElement('div');
    newRow.className = 'item-table-row';
    newRow.innerHTML = `
    <div><input type="text" placeholder="S.No" /></div>
      <div>
                                    <select>
                                        <option value="">Select Item</option>
                                        <option value="item1">Item 1</option>
                                        <option value="item2">Item 2</option>
                                        <option value="item3">Item 3</option>
                                        <!-- Add more options as needed -->
                                    </select>
                                </div>
      <div><input type="text" placeholder="Item Code" /></div>
      <div><input type="text" placeholder="EAN Number" /></div>
      <div><input type="text" placeholder="Month" /></div>
      <div>
      <select>
      <option value="">Select Size</option>
      <option value="S">Small</option>
      <option value="M">Medium</option>
      <option value="L">Large</option>
      <option value="XL">Extra Large</option>
       <!-- Add more sizes as needed -->
       </select>
        </div>

      <div><input type="text" placeholder="Quantity" /></div>
      <div>
        <button type="button" class="delete-btn" onclick="deleteRow(this)">🗑</button>
      </div>
    `;
    container.appendChild(newRow);
  }

  function deleteRow(btn) {
    const row = btn.closest('.item-table-row');
    row.remove();
  }


  function handleAddressChoice() {
    const selected = document.querySelector('input[name="addressChoice"]:checked');
    const manualEntry = document.getElementById('manual-entry');

    if (selected && selected.value === 'manual') {
      manualEntry.style.display = 'block';
    } else {
      manualEntry.style.display = 'none';
    }
  }



function toggleOtherPacking() {
  const select = document.getElementById('packingSelect');
  const otherGroup = document.getElementById('otherPackingGroup');
  otherGroup.style.display = select.value === 'other' ? 'block' : 'none';
}

function toggleOtherFinishing() {
  const select = document.getElementById('finishingSelect');
  const otherGroup = document.getElementById('otherFinishingGroup');
  otherGroup.style.display = select.value === 'other' ? 'block' : 'none';
}



function previewImages() {
  const previewContainer = document.getElementById('imagePreview');
  const files = document.getElementById('imageInput').files;

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.className = 'preview-image';
      previewContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}
