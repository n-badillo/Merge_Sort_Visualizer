export function getMergeSortAnimation(array) {
   // animation code will go here

   const animations = [];
   if (array.length <= 1) return array; // if the array is 1, or 0, it is already sorted so return it.
   const dupArray = array.slice();

   mergeSortHelperFunction(array, 0, array.length - 1, dupArray, animations);
   
   // returning the array of animations when the function is called
   return animations;
  }

  function mergeSortHelperFunction(   main_array,   starting_index,   ending_index,   duplicate_array,  animations ) {
   if (starting_index === ending_index) return;
   const middle_index = Math.floor((starting_index + ending_index) / 2);
   mergeSortHelperFunction(duplicate_array, starting_index, middle_index, main_array, animations);
   mergeSortHelperFunction(duplicate_array, middle_index + 1, ending_index, main_array, animations);
   mergeArrays(main_array, starting_index, middle_index, ending_index, duplicate_array, animations);
  }

  function mergeArrays(   main_array,   starting_index,   middle_index,   ending_index,   duplicate_array,   animations ) {
   let k = starting_index;
   let i = starting_index;
   let j = middle_index + 1;

   while (i <= middle_index && j <= ending_index) {
     // Changing color because comparing
     animations.push([i, j]);

     // Reverting color on second push
     animations.push([i, j]);

     if (duplicate_array[i] <= duplicate_array[j]) {
       // Overwriting values from duplicate array into main array
       animations.push([k, duplicate_array[i]]);
       main_array[k++] = duplicate_array[i++];
     } else {
       // Overwrite value from main array to duplicate array
       animations.push([k, duplicate_array[j]]);
       main_array[k++] = duplicate_array[j++];
     }
   }
   
   while (i <= middle_index) {
     
      // same thing as above, but for the middle index
     animations.push([i, i]);
     animations.push([i, i]);
     animations.push([k, duplicate_array[i]]);
     main_array[k++] = duplicate_array[i++];
   }

   while (j <= ending_index) {
     // same thing as above but for the last index
     animations.push([j, j]);
     animations.push([j, j]);
     animations.push([k, duplicate_array[j]]);
     main_array[k++] = duplicate_array[j++];
   }
 }