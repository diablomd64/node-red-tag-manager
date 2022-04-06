module.exports = function(RED) {
    function TagMemoryNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var memory_payload = null;
		var intervalTimer = setInterval(function(){
			var newMsg = { payload: memory_payload, topic: config.outtopic };
			node.send(newMsg);
			}, config.filter);
        node.on('input', function(msg) {
			memory_payload = msg.payload;
        });
    }
	
		
    RED.nodes.registerType("tag-memory",TagMemoryNode);
}
