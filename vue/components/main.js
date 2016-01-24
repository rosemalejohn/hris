Vue.component('hris-main', {

    ready: function() {

        this.messageListener();

        this.notificationListener();

    },

    events: {

        threadsUpdated: function() {
            this.$broadcast('threadsUpdated');
        },

        messagesUpdated: function() {
            this.$broadcast('messagesUpdated');
        },

        notificationsUpdated: function() {
            this.$broadcast('notificationsUpdated');
        },

        positionsUpdated: function() {
            this.$broadcast('positionsUpdated');
        },

    },

    methods: {

        messageListener: function() {
            var self = this;

            socket.on('message', function(data) {

                self.$broadcast('newMessage', data);

            });
        },

        notificationListener: function() {
            var self = this;

            socket.on('notification', function(data) {

                if (data.sent_to == USER_ID) {
                    $.niftyNoty({
                        type: 'dark',
                        icon: 'fa fa-' + data.icon,
                        message: data.message,
                        container: 'floating',
                        timer: 5000
                    });
                    document.getElementById('notif-alert').play();
                    self.$broadcast('newNotification', data);
                }

            })
        }

    }

});
