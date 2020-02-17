const Main = require("../models/main.model");
const Event = require("../models/event.model");
const Workshop = require("../models/ws.model");

const async = require("async");


exports.show = function(req, res) {
    Main.find({event : req.params.event}, function(err, docs) {
        res.render("onday/", {data : docs});
    });
};

exports.change_attend = function(req, res) {
    Main.findById(req.params.id, function(err, doc) {

        if (doc.isAttended === "fasle")
        {
            doc.isAttended = "true";
        }

        doc.save(function(err) {
            if (err) {
                return console.log(err);
            }
            
            res.redirect("/onday/"+doc.event+"/view");
        });

    });
};

exports.make_winner = function(req, res) {
    Main.findByIdAndUpdate(req.params.id, 
        {$set : {isWinner : "true"}}, 
        function(err, doc) {
            if (err) {
                return console.log(err);
            }

            res.redirect("/onday/"+req.params.event+"/view");
    }); 
};

exports.edit_doc = function(req, res) {
    Main.findById(req.params.id, function(err, doc) {
        res.render("onday/", {data : doc});
    });

};

exports.update_doc = function(req, res) {
    Main.findByIdAndUpdate(req.params.id, 
        {
            $set : {
                name : req.body.name,
                email : req.body.email,
                phone : req.body.phone,
                inst : req.body.inst
            }
        }, function(err, doc) {
            if (err) {
                res.redirect("/onday/new/"+req.params.id);
            }
            else {
                res.redirect("/onday/")
            }
        })
};

exports.show_register = function(req, res) {
    res.render("onday/");
};

exports.new_register = function(req, res) {

    let doc = new Main({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        inst : req.body.inst,
        event : req.params.event,
        isSpot : "true",
        isAttended : "true"
    });

    doc.save(function(err) {
        if (err) {

        }
        else {
            res.redirect("/onday/"+req.params.event+"/view");
        }
    });

};


exports.registration_show = function(req, res) {
    Main.find({event : req.params.event}, function(err, docs) {
        Event.find({name : req.params.event}, function(err, event) {
            let status = event.isOpen;
            res.render("onday/onday_list", {data : docs , event : req.params.event ,branch : req.params.branch, status : status});
        });
    
    });
};


exports.registration_spot_detail = function(req,res){
    res.render("onday/onday_new",{branch:req.params.branch, event:req.params.event});
};

exports.registration_spot_insert = function(req,res){
    let doc = new Main({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        event : req.params.event,
        inst : req.body.inst,
        isSpot : "true",
        isAttended : "true"
    });

    doc.save(function(err) {
        if (err) {
            return res.redirect("/onday/"+req.params.branch+"/"+req.params.event+"/new/");
        }

        res.redirect("/onday/"+req.params.branch+"/"+req.params.event+"/view/");        
    });
}

exports.registration_update_detail = function(req,res){
    Main.findById(req.params.id, function(err, doc) {
        if (err) {
            return res.redirect("/onday/"+req.params.branch+"/"+req.params.event+"/new/");        
        }

        res.render("onday/onday_edit", {data : doc, branch: req.params.branch});        
    });
};

exports.registration_update_insert = function(req,res){


}

exports.registration_attended_mark = function(req,res){


}

exports.registration_winner_mark = function(req,res){

    
}
