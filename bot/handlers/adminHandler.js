const notes = require("../../models/notesModel");
const finalExam = require("../../models/finalExamModel");
const midExam = require("../../models/midExamModel");
const subjects = [["General math", "Applied I","Physics", "Psychology"],[ "Logic", "Geograph", "Civic"], ["Anthro", "Emerging", "Entrepreneur"], ["🏠Back to main menu"]]
let subject = "";
const Admin_start = (bot, msg)=>{
  bot.sendMessage(msg.chat.id, "What would you like to do ?✏️",{ reply_markup: { keyboard: [["📝Add notes", "📝Add mid exam"],["📝Add final exam"]], one_time_keyboard: false, resize_keyboard: true}});
}
const Admin_keyButtons = async (bot, msg)=>{
  if(msg.text === "📝Add notes"){
    bot.sendMessage(msg.chat.id, "Choose a subject✏️", {reply_markup: { keyboard: [subjects], one_time_keyboard: true, resize_keyboard: true}});
    addNotes = true;
  }
  if(addNotes && subjects.includes(msg.text)){
    subject = msg.text;
    bot.sendMessage(msg.chat.id, "Send the notes here✈️",{ reply_markup: { keyboard: [["🏠Back to main menu"]], one_time_keyboard: true, resize_keyboard: true}});
  }
  if(addNotes && msg.text === "Enough✖️"){
    addNotes = false;
  }
  if(addNotes && msg.document){
    await notes.create({subject: subject, fileId: msg.document.file_id});
    bot.sendDocument(msg.chat.id, msg.document.file_id, {caption: {reply_markup: { keyboard: [["Enough✖️"]], one_time_keyboard: true, resize_keyboard: true}}});
    }
    bot.sendMessage(msg.chat.id, "Notes added successfully ✅️", {reply_markup: { keyboard: [["🏠Back to main menu"]], one_time_keyboard: true, resize_keyboard: true}});
  }
  
  if(msg.text === "📝Add mid exam"){
    bot.sendMessage(msg.chat.id, "Choose a subject✏️", {reply_markup: { keyboard: [subjects], one_time_keyboard: true, resize_keyboard: true}});
    addMid = true;
  }
  if(addMid && subjects.includes(msg.text)){
    subject = msg.text;
    bot.sendMessage(msg.chat.id, "Send the exams here✈️",{ reply_markup: { keyboard: [["🏠Back to main menu"]], one_time_keyboard: true, resize_keyboard: true, }});
  }
  if(addMid && msg.text === "Enough✖️"){
    bot.sendMessage(msg.chat.id, "Exams added successfully ✅️", {reply_markup: { keyboard: [["🏠Back to main menu"]], one_time_keyboard: true, resize_keyboard: true}});
    addMid = false;
    subject = "";
  }
  if(addMid && msg.document){
    await midExam.create({subject: subject, fileId: msg.document.file_id});
    bot.sendDocument(msg.chat.id, msg.document.file_id, {reply_markup: { keyboard: [["Enough✖️"]], one_time_keyboard: true, resize_keyboard: true,  inline_keyboard:{ text: "Remove✖️", callback_data: `remove:${msg.document.file_id}`}}});
    
  }
  if(msg.text === "📝Add final exam"){
    bot.sendMessage(msg.chat.id, "Choose a subject✏️", {reply_markup: { keyboard: [subjects], one_time_keyboard: true, resize_keyboard: true}});
    addFinal = true;
  }
  if(addFinal && subjects.includes(msg.text)){
    subject = msg.text;
    bot.sendMessage(msg.chat.id, "Send the exams here✈️",{ reply_markup: { keyboard: [["🏠Back to main menu"]], one_time_keyboard: true, resize_keyboard: true}});
  }
  if(addFinal && msg.text === "Enough✖️"){
    bot.sendMessage(msg.chat.id, "Exams added successfully ✅️", {reply_markup: { keyboard: [["🏠Back to main menu"]], one_time_keyboard: true, resize_keyboard: true}});
    addFinal = false;
    subject = "";
  }
  if(addFinal && subject && msg.document){
    await finalExam.create({subject: subject, fileId: msg.document.file_id});
    bot.sendDocument(msg.chat.id, msg.document.file_id, {reply_markup: { inline_keyboard: [{text: "Remove✖️", callback_data: `remove:${msg.document.file_id}`}]}});
    bot.sendMessage(msg.chat.id, {reply_markup: { keyboard: [["Enough✖️"]], one_time_keyboard: true, resize_keyboard:true}})
  }
  if( )
}