<template>
  <div class='control'>
    <br>
    <div class='tags'>
      <span class='tag-simply' :class="{ simply: isSimply }">{{ isSimply ? 'Простой ' : 'Иерархичный ' }} </span>
      <span class='tag-time' :class="{ unperiodic: isNotPeriodic }">{{ isNotPeriodic ? 'Непериодический ' : 'Периодический ' }} </span>
      <span class='tag-reg' :class="{ registered: isRegistered }">{{ isRegistered ? 'Регистрируется ' : 'Нерегистрируется ' }} </span>
      
    </div>
  </div>
</template>
<script>
export default {
  props:{
    isSimply: {
      type: Boolean,
      default: false
    },
    isNotPeriodic: {
      type: Boolean,
      default: false
    },
    isRegistered: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style>
.control {
  box-sizing: border-box;
  clear: both;
  font-size: 1rem;
  position: relative;
  text-align: left;
}
.tags {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}
.tags span::after {
  content: "\00a0 ";
}
.tags span::before {
  padding-top: 1px; /*нужно найти способ автоматом поставить в центр по вертикали*/
}
.tag-simply {
  display: inline-flex;
  background-color: #23d160;
  border-radius: 4px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  margin-right: 0;
}
.tag-simply::before {
  content: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTMsM0g5VjdIM1YzTTE1LDEwSDIxVjE0SDE1VjEwTTE1LDE3SDIxVjIxSDE1VjE3TTEzLDEzSDdWMThIMTNWMjBIN0w1LDIwVjlIN1YxMUgxM1YxM1oiIC8+PC9zdmc+");
  
}
.simply {
  background-color: #23aed1;
}
.simply::before {
  content: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTcsNUgyMVY3SDdWNU03LDEzVjExSDIxVjEzSDdNNCw0LjVDNC44Myw0LjUgNS41LDUuMTcgNS41LDZDNS41LDYuODMgNC44Myw3LjUgNCw3LjVDMy4xNyw3LjUgMi41LDYuODMgMi41LDZDMi41LDUuMTcgMy4xNyw0LjUgNCw0LjVNNCwxMC41QzQuODMsMTAuNSA1LjUsMTEuMTcgNS41LDEyQzUuNSwxMi44MyA0LjgzLDEzLjUgNCwxMy41QzMuMTcsMTMuNSAyLjUsMTIuODMgMi41LDEyQzIuNSwxMS4xNyAzLjE3LDEwLjUgNCwxMC41TTcsMTlWMTdIMjFWMTlIN000LDE2LjVDNC44MywxNi41IDUuNSwxNy4xNyA1LjUsMThDNS41LDE4LjgzIDQuODMsMTkuNSA0LDE5LjVDMy4xNywxOS41IDIuNSwxOC44MyAyLjUsMThDMi41LDE3LjE3IDMuMTcsMTYuNSA0LDE2LjVaIiAvPjwvc3ZnPg==");
  
}
.tag-time {
  display: inline-flex;
  background-color: #b57bcf;
  border-radius: 0px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  margin-right: 0;
}
.tag-time::before {
  content: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyLDIwQTcsNyAwIDAsMSA1LDEzQTcsNyAwIDAsMSAxMiw2QTcsNyAwIDAsMSAxOSwxM0E3LDcgMCAwLDEgMTIsMjBNMTkuMDMsNy4zOUwyMC40NSw1Ljk3QzIwLDUuNDYgMTkuNTUsNSAxOS4wNCw0LjU2TDE3LjYyLDZDMTYuMDcsNC43NCAxNC4xMiw0IDEyLDRBOSw5IDAgMCwwIDMsMTNBOSw5IDAgMCwwIDEyLDIyQzE3LDIyIDIxLDE3Ljk3IDIxLDEzQzIxLDEwLjg4IDIwLjI2LDguOTMgMTkuMDMsNy4zOU0xMSwxNEgxM1Y4SDExTTE1LDFIOVYzSDE1VjFaIiAvPjwvc3ZnPg==");
}
.unperiodic {
  background-color: #cfb27b;
}
.unperiodic::before {
  content: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyLDIwQTcsNyAwIDAsMSA1LDEzQzUsMTEuNzIgNS4zNSwxMC41IDUuOTUsOS41TDE1LjUsMTkuMDRDMTQuNSwxOS42NSAxMy4yOCwyMCAxMiwyME0zLDRMMS43NSw1LjI3TDQuNSw4LjAzQzMuNTUsOS40NSAzLDExLjE2IDMsMTNBOSw5IDAgMCwwIDEyLDIyQzEzLjg0LDIyIDE1LjU1LDIxLjQ1IDE3LDIwLjVMMTkuNSwyM0wyMC43NSwyMS43M0wxMy4wNCwxNEwzLDRNMTEsOS40NEwxMywxMS40NFY4SDExTTE1LDFIOVYzSDE1TTE5LjA0LDQuNTVMMTcuNjIsNS45N0MxNi4wNyw0Ljc0IDE0LjEyLDQgMTIsNEMxMC4xNyw0IDguNDcsNC41NSA3LjA1LDUuNUw4LjUsNi45NEM5LjUzLDYuMzUgMTAuNzMsNiAxMiw2QTcsNyAwIDAsMSAxOSwxM0MxOSwxNC4yNyAxOC42NSwxNS40NyAxOC4wNiwxNi41TDE5LjUsMTcuOTRDMjAuNDUsMTYuNTMgMjEsMTQuODMgMjEsMTNDMjEsMTAuODggMjAuMjYsOC45MyAxOS4wMyw3LjM5TDIwLjQ1LDUuOTdMMTkuMDQsNC41NVoiIC8+PC9zdmc+");
}
.tag-reg {
  display: inline-flex;
  background-color: rgba(209, 147, 12, 0.774);
  border-radius: 4px;
  margin-left: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.tag-reg::before {
  content: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIzLDEyTDIwLjU2LDE0Ljc4TDIwLjksMTguNDZMMTcuMjksMTkuMjhMMTUuNCwyMi40NkwxMiwyMUw4LjYsMjIuNDdMNi43MSwxOS4yOUwzLjEsMTguNDdMMy40NCwxNC43OEwxLDEyTDMuNDQsOS4yMUwzLjEsNS41M0w2LjcxLDQuNzJMOC42LDEuNTRMMTIsM0wxNS40LDEuNTRMMTcuMjksNC43MkwyMC45LDUuNTRMMjAuNTYsOS4yMkwyMywxMk0yMC4zMywxMkwxOC41LDkuODlMMTguNzQsNy4xTDE2LDYuNUwxNC41OCw0LjA3TDEyLDUuMThMOS40Miw0LjA3TDgsNi41TDUuMjYsNy4wOUw1LjUsOS44OEwzLjY3LDEyTDUuNSwxNC4xTDUuMjYsMTYuOUw4LDE3LjVMOS40MiwxOS45M0wxMiwxOC44MUwxNC41OCwxOS45MkwxNiwxNy41TDE4Ljc0LDE2Ljg5TDE4LjUsMTQuMUwyMC4zMywxMloiIC8+PC9zdmc+");
}
.registered {
  background-color: #db7937;
}
.registered::before {
  content: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIzLDEyTDIwLjU2LDkuMjJMMjAuOSw1LjU0TDE3LjI5LDQuNzJMMTUuNCwxLjU0TDEyLDNMOC42LDEuNTRMNi43MSw0LjcyTDMuMSw1LjUzTDMuNDQsOS4yMUwxLDEyTDMuNDQsMTQuNzhMMy4xLDE4LjQ3TDYuNzEsMTkuMjlMOC42LDIyLjQ3TDEyLDIxTDE1LjQsMjIuNDZMMTcuMjksMTkuMjhMMjAuOSwxOC40NkwyMC41NiwxNC43OEwyMywxMk0xMCwxN0w2LDEzTDcuNDEsMTEuNTlMMTAsMTQuMTdMMTYuNTksNy41OEwxOCw5TDEwLDE3WiIgLz48L3N2Zz4=");
}
</style>
