<template>
    <div class="spinner-wrap">        
        <svg
            class="spinner"
            width="32px"
            height="32px"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                class="spinner-track"
                cx="25" cy="25" r="20"
                fill="none"
                stroke-width="4"
            />
            <circle
                class="spinner-arc"
                cx="25" cy="25" r="20"
                fill="none"
                stroke-width="4"
                stroke-linecap="round"
            />
        </svg>
    </div>
</template>
  
<style>
  @keyframes rotate {
    100% { transform: rotate(360deg); }
  }
  
  @keyframes dash {
    0%   { stroke-dasharray: 1, 200; stroke-dashoffset: 0; }
    50%  { stroke-dasharray: 100, 200; stroke-dashoffset: -30px; }
    100% { stroke-dasharray: 100, 200; stroke-dashoffset: -125px; }
  }
</style>