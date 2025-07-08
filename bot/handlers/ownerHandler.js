const admins = require("../../models/adminsModel");
let addAdmin = false;
let newAdmin = {};
const cmds = ['➕️Add admin', '💻View current admins', '☄️Remove admin']
const owner_Start = (bot, msg) => {
  bot.sendMessage(msg.chat.id, "What would you like to do ?✏️",{ reply_markup: { keyboard: [["➕️Add admin", "💻View current admins"],["✖️Delete admins"]], one_time_keyboard: true, resize_keyboard: true}}
  );
}
const owner_keyButtons = async (bot, msg) => {
  if(msg.text === "➕️Add admin" && addAdmin){
    bot.sendMessage(msg.chat.id, "Forward the new admin✈️", {reply_markup: { keyboard: [["🏠Back to main menu"]], one_time_keyboard: true, resize_keyboard: true}})
    addAdmin = true;
  }
  if(addAdmin && msg.forward_from){
    newAdmin[msg.chat.id].name = msg.forward_from.first_name;
    newAdmin[msg.chat.id].id = msg.forward_from.id;
    await admins.create(newAdmin[msg.chat.id]);
    bot.sendMessage(msg.chat.id, `Admin ${newAdmin[msg.chat.id].name} added successfully ✅️`, { reply_markup: { keyboard:[["🏠Back to main menu"]]}});
    delete newAdmin[msg.chat.id];
    addAdmin = false;
  }
  if(msg.text === "💻View current admins"){
    bot.sendMessage(msg.chat.id, "Here are the admins💻",{reply_markup:{keyboard:[['🏠Back to main menu']], one_time_keyboard: true, resize_keyboard: true}});
    const adminList = await admins.find({}).sort({ createdAt: -1});
    if( adminList.length === 0 || !adminList || null || undefined){
      bot.sendMessage(msg.chat.id, "No admins found ✖️", { reply_markup: { keyboard: [["🏠Back to main menu"]], one_time_keyboard: true, resize_keyboard: true}});
      
    }else{
      adminList.forEach((admin)=>{
        bot.sendMessage(msg.chat.id, `Name: ${admin.name}\n`, {reply_markup: { inline_keyboard: [[{text: "Remove", callback_data: `remove:${admin.id}`}]]});
      })
    }
  }
}
const owner_inline = async (bot, query)=>{
  if(query.data.startsWith("remove:")){
    const adminId = query.data.split(":")[1];
    await admins.findOneAndDelete({id: adminId});
    bot.sendMessage(query.message.chat.id, "Admin removed successfully ✅️", {reply_markup: { keyboard: [["🏠Back to main menu"]], one_time_keyboard: true, resize_keyboard: true}
    });
  }
}
