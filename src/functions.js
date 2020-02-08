const f = {
  
  factorial: function (n) {
    if (n=0) {
      return 1;
    };
    if (n>0) {
      let i=n;
      let arrangements = [];
      while (i > 0) {
        arrangements.push(i--);
      };
      return (arrangements.reduce((a,b)=>a*b));
    } else throw Error('invalid parameters');
  },

  // Permutations
  // nPr = n!/(n-r)!
  // where n = number of items in set
  // and r = number of items selected
  // e.g. n=5,r=3, nPr = 5*4*3 = 60
  permutations: function (n,r=n) {
    if (n>=r && r>0) {
      let i=n;
      let seats = [];
      while (i > n-r) {
        seats.push(i--);
      };
      return (seats.reduce((a,b)=>a*b));
    } else throw Error('invalid parameters');
  },

  // Combinations
  // nCr = (n!/(n-r)!)/r!
  //     = n!/(r!(n-r)!)
  // e.g. n=6, r=4, nCr = 6*5/(2*1) = 15
  combinations: function (n,r=n) {
    return (
      (n===r)?1
      :this.permutations(n,r)/this.factorial(r)
    );
  },

  // Binary search
  // O(log(n))
  // Omega(1) (best case)
  bsearch: function (arr, target) {
    // search space is between left and right indexes
    let left = 0;
    let right = arr.length -1;
    while (left <= right) {
      // find the mid-point
      let mid = Math.floor((left+right)/2);
      if (arr[mid]===target) {
        // value found
        return mid;
      } else if (arr[mid] < target) {
        // search the right half
        left = mid +1;
      } else {
        // search left half
        right = mid -1;
      };
    };
    // searched all values without match
    return -1;
  },
  bsearchRecursive: function (arr, target, left=0, right=arr.length-1) {
    // no match after recursion
    if (left > right) {
      return -1;
    };
    // find midpoint
    let mid = Math.floor((left + right) /2);
    if (arr[mid]===target) {
      return mid;
    } else if (arr[mid] < target) {
      // search right half
      return this.bsearchRecursive(arr, target, mid +1, right);
    } else {
      // search left half
      return this.bsearchRecursive(arr, target, left, mid -1);
    };
  },

  // Swap two indices in arr
  swap: function (arr, i, j) {
    const temp = arr[i];
    arr[i]=arr[j];
    arr[j]=temp;
  },

  // Bubble sort
  // O(n**2)
  // Omega(n) (best-case)
  // note: slowest but can detect pre-sorted
  bubbleSort: function (arr) {
    for (let j=0; j<arr.length-1; j++) {
      for (let i=0; i<arr.length-1; i++) {
        if (arr[i] > arr[i+1]) {
          this.swap(arr, i, i+1);
        };
      };
    };
  },
  bubbleSortRecursive: function (arr, n=arr.length) {
    for (let i=0; i<n-1; i++) {
      if (arr[i] > arr[i+1]) {
        this.swap(arr, i, i+1);
      };
    };
    if (n-1 > 1) {
      this.bubbleSortRecursive(arr, n-1);
    };
  },

  // Quick sort
  // O(n*log(n))
  // worst case: O(n**2)
  // note: fastest, except does not detect pre-sorted
  // Lomuto partition
  partition: function (arr, start, end) {
    // pick rightmost element as pivot
    let pivotValue = arr[end];
    // move elements smaller than pivot to left 
    // start at far left
    let j = start;
    for (let i=start; i < end; i++) {
      // compare each value
      if (arr[i] <= pivotValue) {
        // move to the left
        this.swap(arr, i, j);
        // increment to next most left
        j++;
      };
    };
    // move the pivot to the next left index
    this.swap(arr, end, j);
    // return the new pivot index
    return j;
  },
  quickSort: function (arr, start=0, end=arr.length-1) {
    // base
    if (start>=end) {
      return;
    };
    // rearrange around pivot
    let pivot = this.partition(arr, start, end);
    // recur below pivot
    this.quickSort(arr, start, pivot -1);
    // recur above pivot
    this.quickSort(arr, pivot +1, end);
  },

  // Insertion sort
  // O(n**2)
  // Omega(n) (best case)
  // note: can detect fully sorted
  // note: can sort as it receives
  insertionSort: function (arr) {
    // split into sorted subset arr[0...i-1]
    // and unsorted subset arr[i...arr.length]
    // first element [0] starts in sorted set
    // so start with second element (i=1)
    for (let i=1; i < arr.length; i++) {
      let value = arr[i];
      let j = i;
      // loop down through indices in the sorted set
      // to find the insertion position
      while (j>0 && arr[j-1] > value) {
        // shuffle the sorted set above the insertion up 
        // to make space for the insertion
        arr[j] = arr[j-1];
        j--;
      };
      // insert the element
      arr[j] = value;
    };
  },
  insertionSortRecursive: function (arr, i=1, n=arr.length) {
    // split into sorted subset arr[0...i-1]
    // and unsorted subset arr[i...arr.length]
    // first element [0] starts in sorted set
    // so start with second element (i=1)
    let value = arr[i];
    let j = i;
    // loop down through indices in the sorted set
    // to find the insertion position
    while (j>0 && arr[j-1] > value) {
      // shuffle the sorted set above the insertion up 
      // to make space for the insertion
      arr[j] = arr[j-1];
      j--;
    };
    // insert the value
    arr[j] = value;
    // recursively sort next element
    if (i+1 < n) {
      this.insertionSortRecursive(arr, i+1, n)
    };
  },
  // Selection sort
  // O(n**2)
  // Omega(n**2) (no best case)
  // note: generally slower than insertion but fewer (n) memory writes
  selectionSort: function(arr) {
    // split into sorted and unsorted subsets
    // sorted subset starts empty (i=0)
    for (let i=0; i<arr.length-1; i++) {
      // select the smallest value from the unsorted subset
      let min = i;
      for (let j=i+1; j<arr.length; j++) {
        if (arr[j] < arr[min]) {
          min = j;
        };
      };
      // swap with the first element of the unsorted subset
      this.swap(arr, min, i);
    };
  },
  selectionSortRecursive: function(arr, i=0, n=arr.length) {
    // split into sorted and unsorted subsets
    // sorted subset starts empty (i=0)
    // select the smallest value from the unsorted subset
    let min = i;
    for (let j=i+1; j<arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      };
    };
    // swap with the first element of the unsorted subset
    this.swap(arr, min, i);
    if (i+1 < n) {
      this.selectionSortRecursive(arr, i+1, n)
    };
  },
  // Merge sort
  // O(n*log(n))
  // Omega(n*log(n)) (no best case)

  // merge two sorted, adjacent subsets of an array
  merge: function(arr, newArr=[], mid, low=0, high=arr.length-1) {
    let leftIndex = low; 
    let rightIndex = mid+1;
    let i = low;
    // loop through both arrays until one is done
    while (leftIndex <= mid && rightIndex <= high) {
      // add the smaller value to the new array
      if (arr[leftIndex] <= arr[rightIndex]) {
          newArr[i]=arr[leftIndex];
          leftIndex++;
          i++;
      } else {
          newArr[i]=arr[rightIndex];
          rightIndex++;
          i++;
      };
    };
    // add the rest of the left subset
    while (leftIndex <= mid ) {
      newArr[i]=arr[leftIndex];
      leftIndex++;
      i++;
    };
    // copy back to the original array
    // remaining right subset is unchanged
    for (let i=low; i<newArr.length; i++) {
      arr[i] = newArr[i];
    };
  },
  mergeSort: function(arr, newArr=[], low=0, high=arr.length-1) {
    // if only 1 element, finish
    if (high===low) {
      return;
    };
    // find mid point
    let mid = Math.floor((low + high)/2);
    // recursively split
    this.mergeSort(arr, [], low, mid);
    this.mergeSort(arr, [], mid+1, high);

    // merge the splits back together
    this.merge(arr, [], mid, low, high);
  }
};

export default f;