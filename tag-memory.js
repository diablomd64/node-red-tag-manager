module.exports = function(RED) {
    function TagMemoryNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var memory_payload = null;
		var intervalTimer = setInterval(function()
		{
			if(!config.extclock)
			{
				var newMsg = { payload: memory_payload, topic: config.outtopic };
				node.send(newMsg);
			}
				
		}, config.filter);
        node.on('input', function(msg) {
			if(config.extclock)
			{
				if(config.triggertopic !== "" && msg.topic == config.triggertopic)
				{
					var newMsg = { payload: memory_payload, topic: config.outtopic };
					node.send(newMsg);
				}
				else
				{
					memory_payload = msg.payload;					
				}
			}
			else
			{
				memory_payload = msg.payload;
			}
        });
    }
	
		
    RED.nodes.registerType("tag-memory",TagMemoryNode);
}
